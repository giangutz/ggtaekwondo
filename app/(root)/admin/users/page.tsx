"use client";

import {
  getUsers,
  updateUserClassById,
  updateUserParentById,
  updateUserRoleById,
} from "@/lib/actions/user.actions";
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
import { useToast } from "@/components/ui/use-toast";
import RoleDropdown from "@/components/shared/RoleDropdown";
import { DeleteUser } from "@/components/shared/DeleteUser";
import Pagination from "@/components/shared/Pagination";
import { SearchParamProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import ParentDropdown from "@/components/shared/ParentDropdown";
import { useRouter } from "next/navigation";

const Page = ({ searchParams }: SearchParamProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const { toast } = useToast();

  const usersPage = Number(searchParams?.usersPage) || 1;
  const searchText = (searchParams?.query as string) || "";

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers({
        query: searchText,
        page: usersPage,
        limit: 10,
      });

      if (!users) {
        setLoading(true);
      }

      users && setUsers(users);
      setLoading(false);
    };

    fetchUsers();
  }, [searchText, usersPage]);

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
  };

  const handleParentChange = async (userId: string, newParent: string) => {
    try {
      const updatedUserParent = await updateUserParentById(userId, newParent);
      if (updatedUserParent) {
        toast({
          title: `${updatedUserParent.firstName} ${updatedUserParent.lastName} parent updated successfully`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Parent update failed. Please try again.",
      });
    }
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Manage Users</h3>
        </div>
      </section>
      {loading ? (
        <div className="wrapper overflow-x-auto justify-center space-y-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </div>
      ) : (
        users?.data.length > 0 && (
          <div className="md:wrapper overflow-x-auto">
            {/* <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search placeholder="Search a Student by Name" />
            <CategoryFilter />
          </div> */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-3/6 text-center">Full Name</TableHead>
                  <TableHead className="w-1/6 text-center">Class</TableHead>
                  <TableHead className="w-1/6 text-center">Role</TableHead>
                  <TableHead className="w-1/6 text-center">Parent</TableHead>
                  <TableHead className="w-1/6 text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((data: any) => (
                  <TableRow key={data._id}>
                    <TableCell className="text-center cursor-pointer" onClick={() => router.push(`/dashboard/${data._id}`)}>
                      {data.firstName} {data.lastName}
                    </TableCell>
                    <TableCell>
                      <ClassDropdown
                        cls={true}
                        value={data.class}
                        onChangeHandler={(newClass: string) =>
                          handleClassChange(data._id, newClass)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <RoleDropdown
                        value={data.role}
                        onChangeHandler={(newRole: string) =>
                          handleRoleChange(data._id, newRole)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <ParentDropdown
                        value={data.parent}
                        onChangeHandler={(newParent: string) =>
                          handleParentChange(data._id, newParent)
                        }
                      />
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <DeleteUser userId={data._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {users?.totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  urlParamName={"usersPage"}
                  page={usersPage}
                  totalPages={users?.totalPages}
                />
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default Page;
