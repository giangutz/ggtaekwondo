import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Validation schema for trial signup requests
const trialSignupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  age: z.string(),
  guardianName: z.string().optional(),
  howHeard: z.string().optional(),
  preferredDate: z.string(),
  additionalInfo: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validatedData = trialSignupSchema.parse(body);
    
    // Convert age group to numeric age for database
    let age: number | null = null;
    if (validatedData.age === "4-12") age = 8; // midpoint
    else if (validatedData.age === "13-17") age = 15; // midpoint
    else if (validatedData.age === "18+") age = 25; // arbitrary adult age
    
    // Initialize Supabase client directly without cookies
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Insert into trial_signups table
    const { data, error } = await supabase
      .from("trial_signups")
      .insert({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        age,
        guardian_name: validatedData.guardianName || null,
        how_heard: validatedData.howHeard || null,
        preferred_date: new Date(validatedData.preferredDate).toISOString(),
        notes: validatedData.additionalInfo || null,
        status: "pending" 
      })
      .select();
    
    if (error) {
      console.error("Error saving trial signup:", error);
      return NextResponse.json(
        { error: "Failed to save trial signup" },
        { status: 500 }
      );
    }

    // TODO: Send notification email to staff about new trial signup
    // This would be implemented with Resend or similar service
    
    return NextResponse.json(
      { success: true, id: data[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Trial signup error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
} 