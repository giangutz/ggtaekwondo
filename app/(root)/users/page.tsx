"use client";
import ChangeUserType from "@/components/shared/ChangeUserType";
import { deleteUser, getAllUser } from "@/lib/actions/user.actions";
import { getAllUserTypes } from "@/lib/actions/usertype.actions";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IUser } from "@/lib/database/models/user.model";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUserTypes = async () => {
      const fetchedUserTypes = await getAllUserTypes();
      const fetchUsers = await getAllUser();
      setUsers(fetchUsers);
      setUserTypes(fetchedUserTypes);
    };

    fetchUserTypes();
  }, []);

  const handleDelete = async (userToDelete: IUser) => {
    try {
      // console.log(userToDelete);
      const deletedUser = await deleteUser(userToDelete._id);
      // Remove the user from the users state
      setUsers(users.filter((user: IUser) => user._id !== userToDelete._id));
      // Close the dialog
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Manage Users</h3>
        </div>
      </section>

      <div className="wrapper overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="w-1/2 sm:w-3/8 py-3">Name</th>
              <th className="w-1/2 sm:w-3/8 py-3">User Type</th>
              <th className="w-1/4 sm:w-1/8 py-3 text-center pr-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((data: any) => (
              <tr
                key={data._id}
                className="p-regular-14 lg:p-regular-16 border-b"
                style={{ boxSizing: "border-box" }}
              >
                <td className="py-4 text-center">
                  {data.firstName} {data.lastName}
                </td>
                <td className="py-4 text-center">
                  <ChangeUserType
                    userType={data.userType}
                    userId={data._id}
                    userTypes={userTypes}
                    onUserTypeChanged={() => setSelectedUser(null)}
                  />
                </td>
                <td className="py-4 text-center flex justify-center cursor-pointer pr-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image
                        src="/assets/icons/delete.svg"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this user?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => handleDelete(data)}
                          className="button w-full bg-destructive hover:bg-red-600"
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
