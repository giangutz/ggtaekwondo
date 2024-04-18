"use server";

import { connectToDatabase } from "@/lib/database";
import Package from "@/lib/database/models/packages.model";
import { handleError } from "@/lib/utils";
import {
  CreatePackageParams,
  DeletePackageParams,
  GetPackageByIdParams,
  UpdatePackageParams,
} from "@/types";
import { revalidatePath } from "next/cache";

// CREATE a new package
export async function createPackage({
  studentId,
  name,
  classesPerWeek,
  startDate,
  endDate,
  isActive,
  path,
}: CreatePackageParams) {
  try {
    await connectToDatabase();
    const newPackage = await Package.create({
      studentId,
      name,
      classesPerWeek,
      startDate,
      endDate,
      isActive,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newPackage));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL package details
// export async function getAllPackageDetails() {
//   try {
//   //   return as static data name: { type: String, required: true },
//   // price: { type: Number, required: true },
//   // duration: { type: Number, required: true },
//   // classesPerWeek: { type: Number, required: true },
//   // startDate: { type: Date, required: true },
//   // endDate: { type: Date, required: true },
//   const pkg = [
//     {
//       name: "12 Sessions",
//       price: 2500,
//     },
//     {
//       name: "6 sessions",
//       price: 1500,
//     },
//   ];
//     return pkg;
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET ALL packages
// export async function getAllPackages(filter) {
//   try {
//     await connectToDatabase();
//     const packages = await Package.find(filter || {});
//     return JSON.parse(JSON.stringify(packages));
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET a package by ID
export async function getPackageById({ userId }: GetPackageByIdParams) {
  try {
    await connectToDatabase();
    // const pkg = await Package.findById(packageId);
    const pkg = await Package.find({ studentId: userId });
    if (!pkg) throw new Error("Package not found");
    return JSON.parse(JSON.stringify(pkg));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE a package
export async function updatePackage({
  packageId,
  updatedPackageData,
}: UpdatePackageParams) {
  try {
    await connectToDatabase();
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      updatedPackageData,
      { new: true }
    );
    if (!updatedPackage) throw new Error("Package not found");
    return JSON.parse(JSON.stringify(updatedPackage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE a package
export async function deletePackage({ packageId }: DeletePackageParams) {
  try {
    await connectToDatabase();
    await Package.findByIdAndDelete(packageId);
  } catch (error) {
    handleError(error);
  }
}
