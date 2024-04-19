import React, { useEffect, useState } from "react";
import { IUser } from "@/lib/database/models/user.model";
import { getAllUser } from "@/lib/actions/user.actions";
import { getUsersByClass } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAttendance } from "@/lib/database/models/attendance.model";

type UserCheckboxProps = {
  value?: { studentId: string; status: string }[];
  onChangeHandler?: (
    selectedUsers: { studentId: string; status: string }[]
  ) => void;
  selectedClass?: string;
  attendance?: IAttendance;
};

const UserCheckbox = ({
  value = [],
  onChangeHandler,
  selectedClass,
  attendance,
}: UserCheckboxProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedClass) {
        const userList = await getUsersByClass(selectedClass);
        setUsers(userList);
      }
    };

    fetchUsers();
  }, [selectedClass]);

  const handleClick = (userId: string) => {
    const index = value.findIndex((student) => student.studentId === userId);
    if (index === -1) {
      onChangeHandler &&
        onChangeHandler([...value, { studentId: userId, status: "present" }]);
    } else {
      const newStudents = [...value];
      if (newStudents[index].status === "absent") {
        newStudents[index].status = "present";
      } else if (newStudents[index].status === "present") {
        newStudents[index].status = "late";
      } else {
        newStudents[index].status = "absent";
      }
      onChangeHandler && onChangeHandler(newStudents);
    }
  };

  return (
    <div className="flex flex-wrap">
      {attendance
        ? attendance.students.map((student: any) => {
            const user = users.find(
              (user: any) => user._id === student.studentId
            );
            if (!user) return null;

            // Try to find the student in the `value` array first. If not found, use the status from `attendance.students`.
            const userStatus =
              value.find((s: any) => s.studentId === user._id)?.status ||
              student.status;

            let bgColor = "bg-red-500";

            if (userStatus === "present") {
              bgColor = "bg-green-500";
            } else if (userStatus === "late") {
              bgColor = "bg-yellow-500";
            }

            return (
              <button
                type="button"
                key={user._id}
                onClick={() => handleClick(user._id)}
                className={`flex-grow m-2 p-2 text-white rounded-full ${bgColor}`}
              >
                {user.firstName} {user.lastName}
              </button>
            );
          })
        : users.map((user: any) => {
            const userStatus = value.find(
              (student: any) => student.studentId === user._id
            )?.status;
            let bgColor = "bg-red-500";

            if (userStatus === "present") {
              bgColor = "bg-green-500";
            } else if (userStatus === "late") {
              bgColor = "bg-yellow-500";
            }

            return (
              <button
                type="button"
                key={user._id}
                onClick={() => handleClick(user._id)}
                className={`flex-grow m-2 p-2 text-white rounded-full ${bgColor}`}
              >
                {user.firstName} {user.lastName}
              </button>
            );
          })}
    </div>
  );
};

export default UserCheckbox;
