export {};

// Create a type for the roles
export type Roles = "admin" | "student";
export type Classes = "Beginner" | "Novice" | "Advanced" | "Elite";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      userId?: string;
      name?: string;
      email?: string;
      role?: Roles;
      class?: Classes;
    };
  }
}
