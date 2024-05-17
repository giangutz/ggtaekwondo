"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { CircleChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CreateAttendance from "@/components/shared/CreateAttendance";
import DeleteAttendance from "@/components/shared/DeleteAttendance";
import { getAllAttendance } from "@/lib/actions/attendance.actions";
import { getAllClass } from "@/lib/actions/class.actions";

const Page = ({ searchParams }: SearchParamProps) => {
    const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const router = useRouter();

  const attendancePage = Number(searchParams?.attendancePage) || 1;
  const searchText = (searchParams?.query as string) || "";

  useEffect(() => {
    const fetchData = async () => {
      const fetchedClasses = await getAllClass();
      setClasses(fetchedClasses);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAttendance = await getAllAttendance({
        query: searchText,
        page: attendancePage,
        limit: 15,
      });

      setAttendance(fetchedAttendance as { data: any; totalPages: number });
    };

    fetchData();
  }, [attendancePage, searchText]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center md:space-x-4">
        <div
          className="mr-2 h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-colors duration-200 ease-in-out"
          onClick={() => router.push('/admin/dashboard')} // or onClick={() => history.goBack()}
        >
          <CircleChevronLeft />
        </div>
        <h2 className="w-full items-center text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
          Attendance
        </h2>
      </div>
      {/* <div className="md:wrapper overflow-x-auto">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search placeholder="Search by Date" />
        </div>
      </div> */}
      {attendance?.data.length > 0 ? (
        <div className="md:wrapper overflow-x-auto">
          <Table>
            {/* <TableCaption>A list of Attendance of the Students</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Class</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.data.map((data: any) => (
                <TableRow key={data._id}>
                  <TableCell className="font-medium text-center">
                    {new Date(data.trainingDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {
                      (
                        classes.find(
                          (cls: any) => cls._id === data.class
                        ) as any
                      )?.name
                    }
                  </TableCell>
                  <TableCell className="flex justify-center gap-4">
                    <CreateAttendance attendance={data} />
                    <DeleteAttendance attendance={data} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {attendance?.totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                urlParamName={"attendancePage"}
                page={attendancePage}
                totalPages={attendance?.totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="wrapper overflow-x-auto flex justify-center">
          <p>There is no training session held yet in the system.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
