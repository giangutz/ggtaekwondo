"use client";
import { ChangeUserType } from "@/components/shared/ChangeUserType";
import CreateAttendance from "@/components/shared/CreateAttendance";
import DeleteAttendance from "@/components/shared/DeleteAttendance";
import { deleteUser, getAllUser } from "@/lib/actions/user.actions";
import { getAllUserTypes } from "@/lib/actions/usertype.actions";
import {
  getAllAttendance,
  getAttendanceById,
} from "@/lib/actions/attendance.actions";
import { getAllClass } from "@/lib/actions/class.actions";
import React, { useEffect, useState } from "react";
import {
  Dialog,
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
import { getAllPackages } from "@/lib/actions/packages.actions";
import { IClass } from "@/lib/database/models/class.model";
import CreatePackage from "@/components/shared/CreatePackage";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserTypes = await getAllUserTypes();
      const fetchedUsers = await getAllUser();
      const fetchedAttendance = await getAllAttendance();
      const fetchedClasses = await getAllClass();
      const fetchedPackages = await getAllPackages();
      setUsers(fetchedUsers);
      setUserTypes(fetchedUserTypes);
      setAttendance(fetchedAttendance);
      setClasses(fetchedClasses);
      setPackages(fetchedPackages);
    };

    fetchData();
  }, []);

  const handleDelete = async (userToDelete: IUser) => {
    try {
      const deletedUser = await deleteUser(userToDelete._id);
      setUsers(users.filter((user: IUser) => user._id !== userToDelete._id));
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
              <th className="w-1/2 sm:w-3/8 py-3">Role</th>
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

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Manage Packages</h3>
        </div>
      </section>

      <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((data: any) => {
          const user = users.find(
            (user: IUser) => user._id === data.studentId
          ) as IUser | undefined;
          const userClass = classes.find(
            (cls: IClass) => cls._id === user?.class
          ) as IClass | undefined;
          const classId = userClass?._id;

          return (
            <div
              key={data._id}
              className="rounded overflow-hidden shadow-lg p-6 bg-white relative"
            >
              <div className="absolute top-4 right-4 flex flex-col space-y-3">
                <CreatePackage pkg={data} classId={classId} />
                <DeleteAttendance attendance={data} />
              </div>
              <h2 className="font-bold text-xl mb-2">
                {
                  (
                    users.find((user: IUser) => user._id === data.studentId) as
                      | IUser
                      | undefined
                  )?.firstName
                }{" "}
                {
                  (
                    users.find((user: IUser) => user._id === data.studentId) as
                      | IUser
                      | undefined
                  )?.lastName
                }
              </h2>
              <div className="flex space-x-8">
                <p className="text-gray-700 text-base">
                  {packages.map((pkg: any) => {
                    if (pkg.studentId === data.studentId) {
                      return pkg.name;
                    }
                    return null;
                  })}
                </p>
                <p className="text-gray-700 text-base">
                  {
                    (
                      classes.find(
                        (cls: IClass) =>
                          cls._id ===
                          (
                            users.find(
                              (user: IUser) => user._id === data.studentId
                            ) as IUser | undefined
                          )?.class
                      ) as IClass | undefined
                    )?.name
                  }
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Start Date: {new Date(data.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">
                End Date: {new Date(data.endDate).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Manage Attendance
          </h3>
        </div>
      </section>

      <div className="wrapper overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="w-1/2 sm:w-3/8 py-3">Date</th>
              <th className="w-1/2 sm:w-3/8 py-3">Class</th>
              <th className="w-1/4 sm:w-1/8 py-3 text-center pr-4">Edit</th>
              <th className="w-1/4 sm:w-1/8 py-3 text-center pr-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((data: any) => (
              <tr
                key={data._id}
                className="p-regular-14 lg:p-regular-16 border-b"
                style={{ boxSizing: "border-box" }}
              >
                <td className="py-4 text-center">
                  {new Date(data.trainingDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-4 text-center">
                  {
                    (classes.find((cls: any) => cls._id === data.class) as any)
                      ?.name
                  }
                </td>
                <td className="py-4 text-center w-20 pr-4">
                  <div className="flex justify-center ml-auto">
                    <CreateAttendance attendance={data} />
                  </div>
                </td>
                <td className="py-4 text-center w-20 pr-4">
                  <div className="flex justify-center ml-auto">
                    <DeleteAttendance attendance={data} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
