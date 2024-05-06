import AdminDashboard from "@/components/shared/AdminDashboard";
import { checkRole } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const ManageUsersAndAttendance = () => {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole("admin")) {
    redirect("/");
  }
  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default ManageUsersAndAttendance;
