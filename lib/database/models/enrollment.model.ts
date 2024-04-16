import { Document, Schema, model, models } from "mongoose";

// Enrollment Schema
const EnrollmentSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

const Enrollment = models.Enrollment || model("Enrollment", EnrollmentSchema);