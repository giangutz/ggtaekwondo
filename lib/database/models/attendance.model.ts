import { Document, Schema, model, models } from "mongoose";

// Attendance Interface
export interface IAttendance extends Document {
  _id: string;
  eventId: string; // Reference to event ID (class)
  students: { studentId: string; attendanceStatus: string }[]; // Array of student attendance objects
  trainingDate: Date;
}

// Attendance Schema
const AttendanceSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  students: [
    {
      studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, required: true }, // Present, Absent, Late
    },
  ],
  trainingDate: { type: Date, required: true },
});

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;