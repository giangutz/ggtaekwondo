"use server";

import { connectToDatabase } from "@/lib/database";
import Package from "@/lib/database/models/packages.model";
import { handleError } from "@/lib/utils";
import {
  CreatePackageParams,
  DeletePackageParams,
  GetAllPackageParams,
  GetPackageByIdParams,
  UpdatePackageParams,
} from "@/types";
import { revalidatePath } from "next/cache";

// CREATE a new package
export async function createPackage({
  studentId,
  name,
  startDate,
  endDate,
  paid,
  isActive,
  path,
}: CreatePackageParams) {
  try {
    await connectToDatabase();
    const newPackage = await Package.create({
      studentId,
      name,
      startDate,
      paid,
      endDate,
      isActive,
    });
    revalidatePath(path);
    revalidatePath("/admin/dashboard");
    return JSON.parse(JSON.stringify(newPackage));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllPackages({ query, limit = 6, page }: GetAllPackageParams) {
  try {
    await connectToDatabase();

    const conditions = query ? { trainingDate: new Date(query) } : {};

    const skipAmount = (Number(page) - 1) * limit;
    const today = new Date();

    const packageQuery = Package.aggregate([
      {
        $addFields: {
          distance: {
            $abs: {
              $subtract: [today, "$endDate"],
            },
          },
          isExpired: {
            $cond: [{ $lt: ["$endDate", today] }, 1, 0],
          },
        },
      },
      {
        $sort: {
          isExpired: 1,
          distance: 1,
        },
      },
      {
        $skip: skipAmount,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          distance: 0,
          isExpired: 0,
        },
      },
    ]);

    const packages = await packageQuery.exec();
    const packageCount = await Package.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(packages)),
      totalPages: Math.ceil(packageCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET a package by ID
export async function getPackageById(userId: string) {
  try {
    await connectToDatabase();
    const pkg = await Package.find({ studentId: userId })
                             .sort({ startDate: -1 }) // Sort packages by startDate in descending order
                             .limit(1); // Limit the result to 1 document
    if (!pkg || pkg.length === 0) return null; // Return null if no package is found
    return JSON.parse(JSON.stringify(pkg[0])); // Return the first (and only) package
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
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updatedPackage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE a package
export async function deletePackage(packageId: string) {
  try {
    await connectToDatabase();
    const pkgDeleted = await Package.findByIdAndDelete(packageId);
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify({ pkgDeleted }));
  } catch (error) {
    handleError(error);
  }
}

export async function checkExistingPackage(studentId: string, startDate: Date) {
  try {
    await connectToDatabase();
    // Get the latest package for the student
    const latestPackage = await Package.findOne({
      studentId,
    }).sort({ endDate: -1 }); // Sort in descending order to get the latest package

    // If there is no existing package, return false
    if (!latestPackage) {
      return false;
    }

    // If the startDate of the new package is before the endDate of the latest package, return true
    if (startDate < latestPackage.endDate) {
      return true;
    }

    // Otherwise, return false
    return false;
  } catch (error) {
    handleError(error);
  }
}
