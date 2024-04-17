import { connectToDatabase } from "@/lib/database";
import PackageDetails from "@/lib/database/models/packagedetails.model";
import { handleError } from "@/lib/utils";

// CREATE a new package details
export async function createPackageDetails(name: string, price: number) {
  try {
    await connectToDatabase();
    const newPackageDetails = await PackageDetails.create({ name, price });
    return JSON.parse(JSON.stringify(newPackageDetails));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL package details
export async function getAllPackageDetails() {
  try {
    await connectToDatabase();
    const packageDetails = await PackageDetails.find({});
    return JSON.parse(JSON.stringify(packageDetails));
  } catch (error) {
    handleError(error);
  }
}

// GET a package details by ID
export async function getPackageDetailsById(packageDetailsId: string) {
  try {
    await connectToDatabase();
    const packageDetails = await PackageDetails.findById(packageDetailsId);

    if (!packageDetails) throw new Error("Package Details not found");
    return JSON.parse(JSON.stringify(packageDetails));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE a package details
export async function updatePackageDetails(
  packageDetailsId: string,
  name: string,
  price: number
) {
  try {
    await connectToDatabase();
    const updatedPackageDetails = await PackageDetails.findByIdAndUpdate(
      packageDetailsId,
      { name, price },
      { new: true }
    );

    if (!updatedPackageDetails) throw new Error("Package Details not found");
    return JSON.parse(JSON.stringify(updatedPackageDetails));
  } catch (error) {
    handleError(error);
  }
}

// DELETE a package details
export async function deletePackageDetails(packageDetailsId: string) {
  try {
    await connectToDatabase();
    await PackageDetails.findByIdAndDelete(packageDetailsId);
  } catch (error) {
    handleError(error);
  }
}
