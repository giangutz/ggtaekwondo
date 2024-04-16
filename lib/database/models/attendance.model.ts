import { Document, Schema, model, models } from "mongoose";

// Attendance Interface
export interface IAttendance extends Document {
  _id: string;
  eventId: string; // Reference to event ID (class)
  studentId: string; // Reference to user ID
  attendanceStatus: string; // Present, Absent, Late
  attendanceDate: Date;
}

// Attendance Schema
const AttendanceSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  attendanceStatus: { type: String, required: true },
  attendanceDate: { type: Date, required: true },
});

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;