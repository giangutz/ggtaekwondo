import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

// Define an interface for the Clerk user data structure we need
interface ClerkUserData {
  id: string;
  email_addresses?: Array<{email_address: string}>;
  first_name?: string;
  last_name?: string;
  phone_numbers?: Array<{phone_number: string}>;
  image_url?: string;
}

export async function POST(req: Request) {
  console.log("Webhook endpoint hit at:", new Date().toISOString());
  
  try {
    // Get the headers directly from request
    const headersList = new Headers(req.headers);
    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");

    console.log("Svix headers:", { svix_id, svix_timestamp, svix_signature: svix_signature?.substring(0, 10) + "..." });

    // If there are no svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing svix headers");
      return new NextResponse("Error: Missing svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);
    console.log("Webhook event type:", payload.type);

    // Create a new Svix instance with your webhook secret
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
      return new NextResponse("Error: Missing webhook secret", {
        status: 500,
      });
    }

    // Verify the webhook payload
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      console.log("Webhook verified successfully");
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new NextResponse("Error verifying webhook", {
        status: 400,
      });
    }

    // Handle the webhook
    const eventType = evt.type;
    const userData = evt.data as ClerkUserData;
    console.log("Processing event:", eventType, "for user:", userData.id);

    if (eventType === "user.created" || eventType === "user.updated") {
      // Extract user data from the webhook payload
      const { id } = userData;
      
      const primaryEmail = userData.email_addresses?.[0]?.email_address;
      const primaryPhone = userData.phone_numbers?.[0]?.phone_number;
      const firstName = userData.first_name || "";
      const lastName = userData.last_name || "";
      const profileImageUrl = userData.image_url;

      console.log("User data:", { id, primaryEmail, firstName, lastName });

      if (!primaryEmail) {
        console.error("User has no email address");
        return new NextResponse("Error: User has no email", { status: 400 });
      }

      // Check if user already exists in Supabase
      const { data: existingUser, error: getUserError } = await supabase
        .from("users")
        .select("*")
        .eq("clerk_id", id)
        .single();
      
      if (getUserError && getUserError.code !== 'PGRST116') {
        console.error("Error checking for existing user:", getUserError);
      }

      if (existingUser) {
        console.log("Updating existing user:", existingUser.id);
        // Update existing user
        const { error: updateError } = await supabase
          .from("users")
          .update({
            email: primaryEmail,
            first_name: firstName || existingUser.first_name,
            last_name: lastName || existingUser.last_name,
            phone: primaryPhone || existingUser.phone,
            profile_image_url: profileImageUrl || existingUser.profile_image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("clerk_id", id);
        
        if (updateError) {
          console.error("Error updating user:", updateError);
          return new NextResponse("Error updating user in database", { status: 500 });
        }
      } else {
        console.log("Creating new user with Clerk ID:", id);
        
        // Create a UUID for Supabase
        const supabaseId = uuidv4();
        
        // Create new user with all required fields
        const newUser = {
          id: supabaseId, // Generate UUID for primary key
          clerk_id: id,
          email: primaryEmail,
          first_name: firstName,
          last_name: lastName,
          phone: primaryPhone || null,
          status: "active",
          user_type: "student", // Default user type
          profile_image_url: profileImageUrl || null,
          age_group: null, // Optional field
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        console.log("Attempting to insert user:", newUser);
        
        // Create new user
        const { error: insertError } = await supabase
          .from("users")
          .insert(newUser);
        
        if (insertError) {
          console.error("Error creating user - details:", insertError);
          return new NextResponse(`Error creating user in database: ${insertError.message}`, { status: 500 });
        }
      }
    } else if (eventType === "user.deleted") {
      // Handle user deletion (optional)
      const { id } = userData;
      console.log("Marking user as inactive:", id);
      
      // Option 1: Delete the user from Supabase
      // await supabase.from("users").delete().eq("clerk_id", id);
      
      // Option 2: Mark user as inactive (recommended)
      const { error: updateError } = await supabase
        .from("users")
        .update({
          status: "inactive",
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", id);
      
      if (updateError) {
        console.error("Error marking user as inactive:", updateError);
        return new NextResponse("Error updating user status in database", { status: 500 });
      }
    }

    console.log("Webhook processed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unhandled error in webhook handler:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 