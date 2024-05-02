export {};

// Create a type for the roles
export type Roles = "superadmin" | "admin" | "student" | "parent";
// export type Classes = "Beginner" | "Novice" | "Advanced" | "Elite";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      userId: string;
      role: Roles;
    };
  }
}
