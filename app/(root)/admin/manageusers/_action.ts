"use server";

import { checkRole } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    redirect("/");
  }

  try {
    const res = await clerkClient.users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    revalidatePath("/admin/manageusers");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
