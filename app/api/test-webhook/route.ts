import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    // Test regular Supabase connection
    const { data: regularData, error: regularError } = await supabase.from('users').select('count').limit(1);
    
    // Test admin connection
    const { data: adminData, error: adminError } = await supabaseAdmin.from('users').select('count').limit(1);
    
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing",
      CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET ? "Set" : "Missing",
    };
    
    return NextResponse.json({
      message: "Test endpoint working!",
      timestamp: new Date().toISOString(),
      regularConnection: {
        status: regularError ? "Error" : "Success",
        error: regularError,
        data: regularData
      },
      adminConnection: {
        status: adminError ? "Error" : "Success",
        error: adminError,
        data: adminData
      },
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