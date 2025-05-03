import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
      CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET ? "Set" : "Missing",
    };
    
    return NextResponse.json({
      message: "Test endpoint working!",
      timestamp: new Date().toISOString(),
      supabaseConnection: error ? "Error" : "Success",
      supabaseError: error,
      supabaseData: data,
      environmentVariables: envVars,
    });
  } catch (error) {
    console.error("Error in test endpoint:", error);
    return NextResponse.json({ 
      message: "Test endpoint error", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 