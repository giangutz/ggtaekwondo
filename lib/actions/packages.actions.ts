import { connectToDatabase } from "@/lib/database";
import Package from "@/lib/database/models/packages.model";
import { handleError } from "@/lib/utils";
import { CreatePackageParams, DeletePackageParams, GetPackageByIdParams, UpdatePackageParams } from "@/types";

// CREATE a new package
export async function createPackage({packageData}: CreatePackageParams) {
  try {
    await connectToDatabase();
    const newPackage = await Package.create(packageData);
    return JSON.parse(JSON.stringify(newPackage));
  } catch (error) {
    handleError(error);
  }
}

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
export async function getPackageById({packageId}: GetPackageByIdParams) {
  try {
    await connectToDatabase();
    const pkg = await Package.findById(packageId);
    if (!pkg) throw new Error("Package not found");
    return JSON.parse(JSON.stringify(pkg));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE a package
export async function updatePackage({packageId, updatedPackageData}: UpdatePackageParams) {
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
export async function deletePackage({packageId}: DeletePackageParams) {
  try {
    await connectToDatabase();
    await Package.findByIdAndDelete(packageId);
  } catch (error) {
    handleError(error);
  }
}
