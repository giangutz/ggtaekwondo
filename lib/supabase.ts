import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database tables based on the schema
export type User = {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  status: 'trial' | 'active' | 'inactive' | 'former';
  user_type: 'student' | 'parent' | 'instructor' | 'admin';
  age_group?: 'child' | 'teen' | 'adult';
  profile_image_url?: string;
  medical_notes?: string;
  created_at: string;
  updated_at: string;
};

export type Belt = {
  id: number;
  name: string;
  color: string;
  rank: number;
  created_at: string;
  updated_at: string;
};

export type StudentProgress = {
  id: string;
  user_id: string;
  current_belt_id: number;
  next_belt_id?: number;
  next_grading_date?: string;
  last_grading_date?: string;
  eligible_for_promotion: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type MembershipPlan = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billing_frequency: 'per_session' | 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  classes_per_week?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type StudentMembership = {
  id: string;
  user_id: string;
  membership_plan_id?: string;
  membership_start_date: string;
  membership_end_date?: string;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  auto_renew: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}; 