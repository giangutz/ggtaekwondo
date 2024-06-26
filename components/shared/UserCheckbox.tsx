import React, { useEffect, useState } from "react";
import { IUser } from "@/lib/database/models/user.model";
import { getUsersByClass } from "@/lib/actions/user.actions";
import { IAttendance } from "@/lib/database/models/attendance.model";

type UserCheckboxProps = {
  value?: { studentId: string; status: string }[];
  onChangeHandler?: (
    selectedUsers: { studentId: string; status: string }[]
  ) => void;
  attendance?: IAttendance;
  users: IUser[];
};

const UserCheckbox = ({
  value = [],
  onChangeHandler,
  attendance,
  users,
}: UserCheckboxProps) => {
  // console.log(attendance)
  // console.log(users)
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
      } else if (newStudents[index].status === "late") {
        newStudents[index].status = "excused";
      } else {
        newStudents[index].status = "absent";
      }
      onChangeHandler && onChangeHandler(newStudents);
    }
  };

  return (
    <div className="flex flex-wrap">
      {users
        .sort((a, b) => a.firstName.localeCompare(b.firstName))
        .map((user: any) => {
          // Try to find the student in the `value` array first. If not found, use the status from `attendance.students`.
          const attendanceRecord = attendance?.students.find(
            (student: any) => student.studentId === user._id
          );
          const userStatus =
            value.find((s: any) => s.studentId === user._id)?.status ||
            attendanceRecord?.attendanceStatus;

          let bgColor = "bg-red-500";

          if (userStatus === "present") {
            bgColor = "bg-green-500";
          } else if (userStatus === "late") {
            bgColor = "bg-yellow-500";
          } else if (userStatus === "excused") {
            bgColor = "bg-blue-500";
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
