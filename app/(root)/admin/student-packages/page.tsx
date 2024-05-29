"use client";
import React, { useState, useEffect } from "react";
import { CircleChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import CreatePackage from "@/components/shared/CreatePackage";
import DeletePackage from "@/components/shared/DeletePackage";
import { getAllPackages } from "@/lib/actions/packages.actions";
import { SearchParamProps } from "@/types";
import { useRouter } from "next/navigation";
import Search from "@/components/shared/Search";
import { getAllUser } from "@/lib/actions/user.actions";
import { getAllClass } from "@/lib/actions/class.actions";
import { IUser } from "@/lib/database/models/user.model";
import { IClass } from "@/lib/database/models/class.model";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { studentClasses as classes } from "@/constants";

const Page = ({ searchParams }: SearchParamProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  // const [classes, setClasses] = useState([]);
  const [packages, setPackages] = useState<{ data: any; totalPages: number }>({
    data: [],
    totalPages: 0,
  });
  const packagePage = Number(searchParams?.packagePage) || 1;
  const searchText = (searchParams?.query as string) || "";

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getAllUser();
      // const fetchedClasses = await getAllClass();

      setUsers(fetchedUsers);
      // setClasses(fetchedClasses);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getAllUser();
      const fetchedClasses = await getAllClass();

      const fetchedPackages = await getAllPackages({
        query: searchText,
        page: packagePage,
        limit: 10,
      });

      if (!(fetchedPackages && fetchedUsers && fetchedClasses)) {
        setLoading(true);
      }

      setUsers(fetchedUsers);
      // setClasses(fetchedClasses);
      setPackages(fetchedPackages as { data: any; totalPages: number });
      setLoading(false);
    };

    fetchData();
  }, [packagePage, searchText]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
  <div className="flex items-center md:space-x-4">
    <div
      className="mr-2 h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-colors duration-200 ease-in-out"
      onClick={() => router.push("/admin/dashboard")}
    >
      <CircleChevronLeft />
    </div>
    <h2 className="w-full items-center text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
      Student Packages
    </h2>
  </div>
  <div className="md:wrapper overflow-x-auto">
    {loading ? (
      <div className="wrapper overflow-x-auto justify-center space-y-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </div>
    ) : packages?.data.length > 0 ? (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Student Name</TableHead>
              <TableHead className="text-center hidden sm:table-cell">
                Package
              </TableHead>
              <TableHead className="text-center hidden sm:table-cell">
                Start Date
              </TableHead>
              <TableHead className="text-center">End Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.data.map((data: any) => {
              const user = users.find(
                (user: IUser) => user._id === data.studentId
              ) as IUser | undefined;
              const userClass = classes.find(
                (cls: any) => cls._id === user?.class
              ) as IClass | undefined;
              const classId = userClass?._id;
              const isExpired = new Date(data.endDate) < new Date();

              return (
                <TableRow
                  key={data._id}
                  className={isExpired ? "bg-gray-200" : ""}
                >
                  <TableCell className="font-medium text-center">
                    {user?.firstName} {user?.lastName}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    {
                      packages.data.find(
                        (pkg: any) => pkg.studentId === data.studentId
                      )?.name
                    }{" "}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <span className="sm:hidden">
                      {new Date(data.startDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <span className="text-center hidden sm:inline">
                      {new Date(data.startDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="sm:hidden">
                      {new Date(data.endDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {new Date(data.endDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-center items-center gap-4">
                    <CreatePackage pkg={data} classId={classId} />
                    <DeletePackage pkg={data} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {packages?.totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              urlParamName={"packagePage"}
              page={packagePage}
              totalPages={packages?.totalPages}
            />
          </div>
        )}
      </div>
    ) : (
      <div className="wrapper overflow-x-auto flex justify-center">
        <p>There is no student who availed a package yet.</p>
      </div>
    )}
  </div>
</div>
  );
};

export default Page;
