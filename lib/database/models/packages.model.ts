import { Document, Schema, model, models } from "mongoose";

// Package Interface
export interface IPackage extends Document {
  _id: string;
  studentId: string; // Reference to User ID
  name: string;
  // classesPerWeek: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  paid: boolean;
}

// Package Schema
const PackageSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  // classesPerWeek: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paid: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
});

const Package = models.Package || model("Package", PackageSchema);

export default Package;
