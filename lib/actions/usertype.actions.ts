"use server";
import { connectToDatabase } from "@/lib/database";
import UserType from "../database/models/usertype.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";

export async function getAllUserTypes() {
  try {
    await connectToDatabase();
    const userTypes = await UserType.find();
    return JSON.parse(JSON.stringify(userTypes));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserType(userId: string, userType: string) {
  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(userId, { role: userType });
    revalidatePath("/users");
    revalidatePath("/");
  } catch (error) {
    handleError(error);
  }
}
