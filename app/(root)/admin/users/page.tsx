"use client";

import { getAllUser, updateUserClassById, updateUserRoleById } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import ClassDropdown from "@/components/shared/ClassDropdown";
import { IUser } from "@/lib/database/models/user.model";
import { useToast } from "@/components/ui/use-toast";
import RoleDropdown from "@/components/shared/RoleDropdown";
import { DeleteUser } from "@/components/shared/DeleteUser";


const Page = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUser();
      users && setUsers(users as IUser[]);
    };

    getUsers();
  }, []);

  const handleClassChange = async (userId: string, newClass: string) => {
    try {
      const updatedUserClass = await updateUserClassById(userId, newClass);
      if (updatedUserClass) {
        toast({
          title: `${updatedUserClass.firstName} ${updatedUserClass.lastName} class updated successfully`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Class update failed. Please try again.",
      });
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const updatedUserRole = await updateUserRoleById(userId, newRole);
      if (updatedUserRole) {
        toast({
          title: `${updatedUserRole.firstName} ${updatedUserRole.lastName} role updated successfully`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Role update failed. Please try again.",
      });
    }
  }

  return (
    <div className="md:wrapper overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/6 text-center">Full Name</TableHead>
            <TableHead className="w-1/6 text-center">Class</TableHead>
            <TableHead className="w-1/6 text-center">Role</TableHead>
            <TableHead className="w-1/6 text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="text-center">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>
                <ClassDropdown
                  value={user.class}
                  onChangeHandler={(newClass: string) =>
                    handleClassChange(user._id, newClass)
                  }
                />
              </TableCell>
              <TableCell>
                <RoleDropdown
                  value={user.role}
                  onChangeHandler={(newRole: string) =>
                    handleRoleChange(user._id, newRole)
                  }
                />
              </TableCell>
              <TableCell className="flex justify-center">
                <DeleteUser userId={user._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
