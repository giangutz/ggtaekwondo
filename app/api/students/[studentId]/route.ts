import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";

// GET /api/students/[studentId] - Get a specific student
export async function GET(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { studentId } = params;
    
    const { data, error } = await supabaseAdmin
      .from("users")
      .select(`
        *,
        student_progress (
          id,
          current_belt_id,
          next_belt_id,
          next_grading_date,
          last_grading_date,
          eligible_for_promotion,
          notes
        ),
        student_progress.current_belt_id (
          id,
          name,
          color,
          rank
        ),
        student_progress.next_belt_id (
          id,
          name,
          color,
          rank
        )
      `)
      .eq("id", studentId)
      .eq("user_type", "student")
      .single();
    
    if (error) {
      console.error("Error fetching student:", error);
      return new NextResponse("Error fetching student", { status: 500 });
    }
    
    if (!data) {
      return new NextResponse("Student not found", { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in /api/students/[studentId] GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH /api/students/[studentId] - Update a student
export async function PATCH(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { studentId } = params;
    const body = await req.json();
    
    // Update user data in the users table
    const userData = {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone || null,
      date_of_birth: body.date_of_birth || null,
      address: body.address || null,
      emergency_contact: body.emergency_contact || null,
      emergency_phone: body.emergency_phone || null,
      status: body.status || "active",
      age_group: body.age_group || null,
      medical_notes: body.medical_notes || null,
      updated_at: new Date().toISOString(),
    };
    
    // Only include defined fields
    Object.keys(userData).forEach(
      (key) => userData[key] === undefined && delete userData[key]
    );
    
    const { error: updateError } = await supabaseAdmin
      .from("users")
      .update(userData)
      .eq("id", studentId)
      .eq("user_type", "student");
    
    if (updateError) {
      console.error("Error updating student:", updateError);
      return new NextResponse(`Error updating student: ${updateError.message}`, { status: 500 });
    }
    
    // If a belt ID is provided, update or create student progress
    if (body.belt_id !== undefined) {
      // First check if student progress exists
      const { data: progressData, error: progressError } = await supabaseAdmin
        .from("student_progress")
        .select("id")
        .eq("user_id", studentId)
        .single();
      
      if (progressError && progressError.code !== "PGRST116") {
        console.error("Error checking student progress:", progressError);
      }
      
      if (progressData) {
        // Update existing progress
        const { error: updateProgressError } = await supabaseAdmin
          .from("student_progress")
          .update({
            current_belt_id: body.belt_id,
            next_belt_id: body.next_belt_id || null,
            next_grading_date: body.next_grading_date || null,
            eligible_for_promotion: body.eligible_for_promotion || false,
            notes: body.progress_notes || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", progressData.id);
        
        if (updateProgressError) {
          console.error("Error updating student progress:", updateProgressError);
        }
      } else {
        // Create new progress
        const { error: insertProgressError } = await supabaseAdmin
          .from("student_progress")
          .insert({
            id: crypto.randomUUID(),
            user_id: studentId,
            current_belt_id: body.belt_id,
            next_belt_id: body.next_belt_id || null,
            next_grading_date: body.next_grading_date || null,
            eligible_for_promotion: body.eligible_for_promotion || false,
            notes: body.progress_notes || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        
        if (insertProgressError) {
          console.error("Error creating student progress:", insertProgressError);
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      id: studentId,
    });
  } catch (error) {
    console.error("Unexpected error in /api/students/[studentId] PATCH:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/students/[studentId] - Delete a student (or mark as inactive)
export async function DELETE(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { studentId } = params;
    
    // For safety, we'll mark the user as inactive rather than deleting
    const { error } = await supabaseAdmin
      .from("users")
      .update({
        status: "inactive",
        updated_at: new Date().toISOString(),
      })
      .eq("id", studentId)
      .eq("user_type", "student");
    
    if (error) {
      console.error("Error deactivating student:", error);
      return new NextResponse(`Error deactivating student: ${error.message}`, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Student deactivated successfully",
    });
  } catch (error) {
    console.error("Unexpected error in /api/students/[studentId] DELETE:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 