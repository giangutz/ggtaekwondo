import CreateAttendance from "@/components/shared/CreateAttendance";
import DeleteAttendance from "@/components/shared/DeleteAttendance";
import { getAllAttendance, getAttendanceById } from "@/lib/actions/attendance.actions";
import { getAllClass } from "@/lib/actions/class.actions";
import Image from "next/image";
import React from "react";

const page = async () => {
  let attendance = await getAllAttendance();
  console.log(attendance);
    attendance = attendance.sort(
      (a: any, b: any) =>
        new Date(b.trainingDate).getTime() - new Date(a.trainingDate).getTime()
    );
  const classes = await getAllClass();
  //   console.log(classes);
  //   console.log(attendance[0].students);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Manage Attendance
          </h3>
          {/* <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#training">Explore More Training</Link>
          </Button> */}
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
                  {/* get class name from classes variable if id matches from attendance._id and classes._id */}
                  {classes.find((cls: any) => cls._id === data.class)?.name}
                  {/* {data.studentStatus === "present" ? (
                    <span className="text-green-500 bg-green-100 px-2 py-1 rounded-full border border-green-500">
                      Present
                    </span>
                  ) : data.studentStatus === "late" ? (
                    <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full border border-yellow-500">
                      Late
                    </span>
                  ) : (
                    <span className="text-red-500 bg-red-100 px-2 py-1 rounded-full border border-red-500">
                      Absent
                    </span>
                  )} */}
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

export default page;
