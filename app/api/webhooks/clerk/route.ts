import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error: Missing svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
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
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error verifying webhook", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    // Extract user data from the webhook payload
    const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;
    
    const primaryEmail = email_addresses?.[0]?.email_address;
    const primaryPhone = phone_numbers?.[0]?.phone_number;

    if (!primaryEmail) {
      return new NextResponse("Error: User has no email", { status: 400 });
    }

    // Check if user already exists in Supabase
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", id)
      .single();

    if (existingUser) {
      // Update existing user
      await supabase
        .from("users")
        .update({
          email: primaryEmail,
          first_name: first_name || existingUser.first_name,
          last_name: last_name || existingUser.last_name,
          phone: primaryPhone || existingUser.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", id);
    } else {
      // Create new user
      await supabase.from("users").insert({
        clerk_id: id,
        email: primaryEmail,
        first_name: first_name || "",
        last_name: last_name || "",
        phone: primaryPhone || null,
        status: "active",
        user_type: "student", // Default user type
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  } else if (eventType === "user.deleted") {
    // Handle user deletion (optional)
    const { id } = evt.data;
    
    // Option 1: Delete the user from Supabase
    // await supabase.from("users").delete().eq("clerk_id", id);
    
    // Option 2: Mark user as inactive (recommended)
    await supabase
      .from("users")
      .update({
        status: "inactive",
        updated_at: new Date().toISOString(),
      })
      .eq("clerk_id", id);
  }

  return NextResponse.json({ success: true });
} 