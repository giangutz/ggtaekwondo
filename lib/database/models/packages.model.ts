// Packages Collection:

// Create a new collection named "packages" to store information about different student enrollment options. This collection should include fields like:
// _id: ObjectId for unique identification.
// name: String representing the package name (e.g., Beginner Monthly, Advanced Yearly).
// description: String detailing the package inclusions (e.g., number of classes, duration).
// price: Number representing the package cost.
// duration: Number specifying the package duration (e.g., in months).
// classesPerWeek: Number representing the number of classes allowed per week.

import { Document, Schema, model, models } from "mongoose";

// Package Interface
export interface IPackage extends Document {
  _id: string;
  studentId: string; // Reference to User ID 
  name: string;
  price: number;
  duration: number; // Duration in months
  classesPerWeek: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

// Package Schema
const PackageSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  classesPerWeek: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

const Package = models.Package || model("Package", PackageSchema);

export default Package;