"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/supabase";

export function useCurrentUser() {
  const { userId, isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  // Get the user's data from Supabase
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async (): Promise<User | null> => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("clerk_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        return null;
      }

      return data as User;
    },
    enabled: !!userId && isSignedIn === true,
  });

  return {
    // Clerk user details
    userId,
    user,
    isLoaded: isAuthLoaded && isUserLoaded,
    isSignedIn,
    
    // Supabase user details
    dbUser,
    isLoadingUser: isLoading,
  };
} 