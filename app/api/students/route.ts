import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid';

// GET /api/students - Get all students
export async function GET(req: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    
    // Get filter parameters
    const status = searchParams.get("status");
    const beltId = searchParams.get("belt_id");
    const ageGroup = searchParams.get("age_group");
    const searchQuery = searchParams.get("query");
    
    // Start building the query
    let query = supabaseAdmin
      .from("users")
      .select(`
        *,
        student_progress (
          id,
          current_belt_id,
          next_belt_id,
          next_grading_date,
          last_grading_date,
          eligible_for_promotion
        ),
        student_progress.current_belt_id (
          id,
          name,
          color
        )
      `)
      .eq("user_type", "student");
    
    // Apply filters if provided
    if (status) {
      query = query.eq("status", status);
    }
    
    if (beltId) {
      query = query.eq("student_progress.current_belt_id", beltId);
    }
    
    if (ageGroup) {
      query = query.eq("age_group", ageGroup);
    }
    
    if (searchQuery) {
      query = query.or(
        `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
      );
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching students:", error);
      return new NextResponse("Error fetching students", { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in /api/students GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/students - Create a new student
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.email || !body.first_name || !body.last_name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    
    // Generate UUID for the new student
    const studentId = uuidv4();
    
    // Prepare user data
    const userData = {
      id: studentId,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone || null,
      date_of_birth: body.date_of_birth || null,
      address: body.address || null,
      emergency_contact: body.emergency_contact || null,
      emergency_phone: body.emergency_phone || null,
      status: body.status || "active",
      user_type: "student",
      age_group: body.age_group || null,
      medical_notes: body.medical_notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Insert student into the database
    const { error: insertError } = await supabaseAdmin
      .from("users")
      .insert(userData);
    
    if (insertError) {
      console.error("Error creating student:", insertError);
      return new NextResponse(`Error creating student: ${insertError.message}`, { status: 500 });
    }
    
    // If a belt ID is provided, create a student progress record
    if (body.belt_id) {
      const progressData = {
        id: uuidv4(),
        user_id: studentId,
        current_belt_id: body.belt_id,
        eligible_for_promotion: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { error: progressError } = await supabaseAdmin
        .from("student_progress")
        .insert(progressData);
      
      if (progressError) {
        console.error("Error creating student progress:", progressError);
        // We won't fail the request if only the progress record fails
      }
    }
    
    return NextResponse.json({
      success: true,
      id: studentId,
    });
  } catch (error) {
    console.error("Unexpected error in /api/students POST:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 