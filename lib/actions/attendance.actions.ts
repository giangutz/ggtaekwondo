"use server";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { CreateAttendanceParams, UpdateAttendanceParams, getAttendanceByIdParams } from "@/types";
import Attendance from "@/lib/database/models/attendance.model";

// CREATE a new attendance record
export async function createAttendance(attendanceData: CreateAttendanceParams) {
  try {
    await connectToDatabase();
    const newAttendance = await Attendance.create(attendanceData);
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
export async function getAttendanceById({ attendanceId }: getAttendanceByIdParams) {
  try {
    await connectToDatabase();
    const attendance = await Attendance.findById(attendanceId).populate("students.studentId"); // Populate student data
    if (!attendance) throw new Error("Attendance not found");
    return JSON.parse(JSON.stringify(attendance));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE an attendance record
export async function updateAttendance({ attendanceId, updatedAttendanceData }: UpdateAttendanceParams) {
  try {
    await connectToDatabase();
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      updatedAttendanceData,
      { new: true }
    );
    if (!updatedAttendance) throw new Error("Attendance not found");
    return JSON.parse(JSON.stringify(updatedAttendance));
  } catch (error) {
    handleError(error);
  }
}

export async function computeSessionsLeft(studentId: string, startDate: Date, endDate: Date, totalSessions: string) {
  try {
    await connectToDatabase();
    const numSessions = parseInt(totalSessions);
    const attendanceRecords = await Attendance.find({
      "students.studentId": studentId,
      trainingDate: { $gte: startDate, $lte: endDate }
    });
    const availedSessions = attendanceRecords.length;
    const sessionsLeft = numSessions - availedSessions;
    // find last date of attendance
    const lastAttendance = attendanceRecords[attendanceRecords.length - 1].trainingDate;
    return { sessionsLeft, lastAttendance };
    // return JSON.parse(JSON.stringify(sessionsLeft));
  } catch (error) {
    handleError(error);
  }
}

export async function getAttendanceByStudent(studentId: string) {
  try {
    await connectToDatabase();
    const attendanceRecords = await Attendance.find({ "students.studentId": studentId });
    const attendanceWithStatus = attendanceRecords.map(record => {
      const student = record.students.find((student: any) => student.studentId.toString() === studentId);
      return {
        ...record._doc,
        studentStatus: student ? student.status : null
      };
    });
    return JSON.parse(JSON.stringify(attendanceWithStatus));
  } catch (error) {
    handleError(error);
  }
}