"use server";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import {
  CreateAttendanceParams,
  GetAllAttendanceParams,
  GetAttendanceByStudentParams,
  UpdateAttendanceParams,
  getAttendanceByIdParams,
} from "@/types";
import Attendance from "@/lib/database/models/attendance.model";
import { revalidatePath } from "next/cache";
import { startOfMonth, endOfMonth } from "date-fns";

// CREATE a new attendance record
export async function createAttendance(attendanceData: CreateAttendanceParams) {
  try {
    await connectToDatabase();
    const newAttendance = await Attendance.create(attendanceData);
    revalidatePath("/dashboard");
    revalidatePath("/admin/dashboard");
    return JSON.parse(JSON.stringify(newAttendance));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL attendance records (consider filtering by event or student)
// export async function getAllAttendance(filter) {
//   try {
//     await connectToDatabase();
//     const attendanceRecords = await Attendance.find(filter || {});
//     return JSON.parse(JSON.stringify(attendanceRecords));
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET an attendance record by ID
export async function getAttendanceById({
  attendanceId,
}: getAttendanceByIdParams) {
  try {
    await connectToDatabase();
    const attendance = await Attendance.findById(attendanceId).populate(
      "students.studentId"
    ); // Populate student data
    if (!attendance) throw new Error("Attendance not found");
    return JSON.parse(JSON.stringify(attendance));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE an attendance record
export async function updateAttendance({
  _id,
  classId,
  trainingDate,
  students,
}: UpdateAttendanceParams) {
  try {
    await connectToDatabase();
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      _id,
      { class: classId, trainingDate, students },
      { new: true }
    );
    if (!updatedAttendance) throw new Error("Attendance not found");
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updatedAttendance));
  } catch (error) {
    handleError(error);
  }
}

export async function computeSessionsLeft(
  studentId: string,
  startDate: Date,
  endDate: Date,
  totalSessions: string
) {
  try {
    await connectToDatabase();
    const numSessions = parseInt(totalSessions);
    let attendanceRecords;

    const targetDate = new Date("2024-06-20"); // replace with your target date
    const currentDate = new Date();

    // Set the time part of the startDate to the start of the day and endDate to the end of the day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    if (currentDate < targetDate) {
      // Old system: only count sessions where the student was present
      attendanceRecords = await Attendance.find({
        students: {
          $elemMatch: {
            studentId: studentId,
            status: "present",
          },
        },
        // trainingDate: { $gte: startDate, $lte: endDate },
        trainingDate: { $gte: startDate },
      });
    } else {
      // New system: count all sessions within the date range
      attendanceRecords = await Attendance.find({
        "students.studentId": studentId,
        trainingDate: { $gte: startDate, $lte: endDate },
        // "students.status": "excused",
      });
    }

    // Log all trainingDate from attendanceRecords
    attendanceRecords.forEach((record) => {
      console.log(record.trainingDate);
    });

    const availedSessions = attendanceRecords.length;
    const sessionsLeft = numSessions - availedSessions;

    // find last date of attendance
    let lastAttendance;
    if (attendanceRecords.length > 0) {
      attendanceRecords.sort(
        (a, b) =>
          new Date(b.trainingDate).getTime() -
          new Date(a.trainingDate).getTime()
      );
      lastAttendance = attendanceRecords[0].trainingDate;
    }
    return { sessionsLeft, lastAttendance };
  } catch (error) {
    console.error(error);
  }
}

export async function getAttendanceByStudent({
  studentId,
  query,
  limit = 6,
  page,
}: GetAttendanceByStudentParams) {
  try {
    await connectToDatabase();

    const dateCondition = query ? { trainingDate: new Date(query) } : {};

    const conditions = {
      "students.studentId": studentId,
      ...dateCondition,
    };

    const skipAmount = (Number(page) - 1) * limit;
    const attendanceQuery = Attendance.find(conditions)
      .sort({ trainingDate: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const attendanceRecords = await attendanceQuery.exec();
    const attendanceCount = await Attendance.countDocuments(conditions);

    const attendanceWithStatus = attendanceRecords.map((record) => {
      const student = record.students.find(
        (student: any) => student.studentId.toString() === studentId
      );
      return {
        ...record._doc,
        studentStatus: student ? student.status : null,
      };
    });

    return {
      data: JSON.parse(JSON.stringify(attendanceWithStatus)),
      totalPages: Math.ceil(attendanceCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getAllAttendance({
  query,
  limit = 6,
  page,
}: GetAllAttendanceParams) {
  try {
    await connectToDatabase();

    const conditions = query ? { trainingDate: new Date(query) } : {};

    const skipAmount = (Number(page) - 1) * limit;
    const attendanceQuery = Attendance.find(conditions)
      .sort({ trainingDate: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const attendanceRecords = await attendanceQuery.exec();
    const attendanceCount = await Attendance.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(attendanceRecords)),
      totalPages: Math.ceil(attendanceCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getMostActiveStudent() {
  try {
    await connectToDatabase();

    // Get the start and end dates for the current month
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    const mostActiveStudent = await Attendance.aggregate([
      { $unwind: "$students" },
      {
        $match: {
          trainingDate: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: "$students.studentId",
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);
    return JSON.parse(JSON.stringify(mostActiveStudent));
  } catch (error) {
    handleError(error);
  }
}

export async function getMonthlyAttendanceRateForAllClasses() {
  try {
    await connectToDatabase();

    // Get the start and end dates for the current month
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    // Fetch all attendance records within the current month
    const attendanceRecords = await Attendance.find({
      trainingDate: { $gte: start, $lte: end },
    });

    // Initialize an object to store the total and present students for each class
    const classStats: any = {};

    // Process each attendance record
    for (const record of attendanceRecords) {
      // Initialize the class stats if they don't exist yet
      if (!classStats[record.class]) {
        classStats[record.class] = { totalStudents: 0, presentStudents: 0 };
      }

      // Update the class stats
      classStats[record.class].totalStudents += record.students.length;
      classStats[record.class].presentStudents += record.students.filter(
        (student: any) => student.status === "present"
      ).length;
    }

    // Calculate the attendance rate for each class
    const attendanceRates = Object.entries(classStats).map(
      ([classId, stats]: any) => {
        const attendanceRate =
          (stats.presentStudents / stats.totalStudents) * 100;
        return { classId, attendanceRate };
      }
    );

    return attendanceRates;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteAttendance(attendanceId: string) {
  try {
    await connectToDatabase();
    const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!deletedAttendance) throw new Error("Attendance not found");
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(deletedAttendance));
  } catch (error) {
    handleError(error);
  }
}
