import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "./supabase";
import type { User } from "./supabase";

export async function getSupabaseUser(): Promise<User | null> {
  // Get the Clerk user
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  // Get the Supabase user associated with the Clerk user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", userId)
    .single();

  if (error || !user) {
    console.error("Error fetching Supabase user:", error);
    return null;
  }

  return user as User;
}

export async function createOrUpdateSupabaseUser() {
  // Get the Clerk user
  const user = await currentUser();
  const { userId } = await auth();
  
  if (!user || !userId) {
    return null;
  }

  const primaryEmail = user.emailAddresses[0]?.emailAddress;
  
  if (!primaryEmail) {
    console.error("User has no email address");
    return null;
  }

  // Check if the user already exists in Supabase
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", userId)
    .single();

  if (existingUser) {
    // Update the user
    const { data, error } = await supabase
      .from("users")
      .update({
        email: primaryEmail,
        first_name: user.firstName || existingUser.first_name,
        last_name: user.lastName || existingUser.last_name,
        updated_at: new Date().toISOString(),
      })
      .eq("clerk_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return null;
    }

    return data as User;
  } else {
    // Create a new user
    const { data, error } = await supabase
      .from("users")
      .insert({
        clerk_id: userId,
        email: primaryEmail,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        status: "active",
        user_type: "student", // Default user type
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      return null;
    }

    return data as User;
  }
} 