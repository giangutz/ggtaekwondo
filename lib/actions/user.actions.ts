"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import Training from "@/lib/database/models/event.model";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

// import Order from "@/lib/database/models/order.model";



// import { CreateUserParams, UpdateUserParams } from "@/types";

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);
    revalidatePath("/users");
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserType(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    
    if (!user) {
      return '';
    }
    return user.userType;
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUser() {
  try {
    await connectToDatabase();

    const users = await User.find();

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

export async function getUsersByClass(classId: string) {
  try {
    await connectToDatabase();

    const users = await User.find({ class: classId });

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findById(userId);

//     if (!user) throw new Error("User not found");
//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(userId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    // await Promise.all([
    //   // Update the 'events' collection to remove references to the user
    //   Training.updateMany(
    //     { _id: { $in: userToDelete.events } },
    //     { $pull: { organizer: userToDelete._id } }
    //   ),

    //   // Update the 'orders' collection to remove references to the user
    // //   Order.updateMany(
    // //     { _id: { $in: userToDelete.orders } },
    // //     { $unset: { buyer: 1 } }
    // //   ),
    // ]);

    // Delete user
    await clerkClient.users.deleteUser(userToDelete.clerkId);
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    revalidatePath("/users");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
