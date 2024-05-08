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
    const attendanceRecords = await Attendance.find({
      "students.studentId": studentId,
      trainingDate: { $gte: startDate, $lte: endDate },
    });
    const availedSessions = attendanceRecords.length;
    const sessionsLeft = numSessions - availedSessions;
    // // find last date of attendance
    let lastAttendance;
    if (attendanceRecords.length > 0) {
      lastAttendance =
        attendanceRecords[attendanceRecords.length - 1].trainingDate;
      return { sessionsLeft, lastAttendance };
    }
    return { sessionsLeft, lastAttendance: null };
    // return JSON.parse(JSON.stringify(sessionsLeft));
  } catch (error) {
    handleError(error);
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

    const dateCondition = query
  ? { trainingDate: new Date(query) }
  : {};

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
