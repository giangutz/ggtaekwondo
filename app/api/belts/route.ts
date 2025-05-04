import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";

// GET /api/belts - Get all belt ranks
export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { data, error } = await supabaseAdmin
      .from("belts")
      .select("*")
      .order("rank", { ascending: true });
    
    if (error) {
      console.error("Error fetching belts:", error);
      return new NextResponse("Error fetching belts", { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in /api/belts GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 