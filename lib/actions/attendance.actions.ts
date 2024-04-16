import { Document, Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { CreateAttendanceParams, UpdateAttendanceParams, getAttendanceByIdParams } from "@/types";
import Attendance from "@/lib/database/models/attendance.model";

// CREATE a new attendance record
export async function createAttendance({attendanceData}: CreateAttendanceParams) {
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
export async function getAttendanceById({attendanceId}: getAttendanceByIdParams) {
  try {
    await connectToDatabase();
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) throw new Error("Attendance not found");
    return JSON.parse(JSON.stringify(attendance));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE an attendance record
export async function updateAttendance({attendanceId, updatedAttendanceData}: UpdateAttendanceParams) {
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
