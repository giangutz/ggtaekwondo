"use client";

import { SearchParamProps } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  Activity,
  DollarSign,
  Hash,
  CalendarClock,
  LoaderCircle,
} from "lucide-react";
import { getPackageById } from "@/lib/actions/packages.actions";
import {
  computeSessionsLeft,
  getAttendanceByStudent,
} from "@/lib/actions/attendance.actions";
import Pagination from "@/components/shared/Pagination";
import { getTransactionByStudent } from "@/lib/actions/transaction.actions";
import Image from "next/image";
import { getUserById } from "@/lib/actions/user.actions";
import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/lib/database/models/user.model";
import { IPackage } from "@/lib/database/models/packages.model";

type DataType = { data: any; totalPages: number } | null;

const Page = ({ params: { id }, searchParams }: SearchParamProps) => {
  const [numberOfSessions, setNumberOfSessions] = useState<{
    sessionsLeft: number;
    lastAttendance: any;
  } | null>(null);

  const [attendance, setAttendance] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const [transactions, setTransactions] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const [hasPackage, setHasPackage] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();

  const userId = id;
  // const user = await getUserById(userId);
  // let hasPackage = false;
  // let numberOfSessions = null;

  const trainingPage = Number(searchParams?.trainingPage) || 1;
  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const searchText = (searchParams?.query as string) || "";

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserById(userId);
      if (!userData) {
        setLoading(true);
      }

      setUser(userData);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedAttendance = await getAttendanceByStudent({
        studentId: userId,
        query: searchText,
        page: trainingPage,
        limit: 10,
      });
      if (!fetchedAttendance) {
        setLoading(true);
      }

      setAttendance(fetchedAttendance as { data: any; totalPages: number });
      setLoading(false);
    };

    fetchData();
  }, [userId, trainingPage, searchText]);

  // Fetch transactions data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedTransactions = await getTransactionByStudent({
        studentId: userId,
        query: searchText,
        page: transactionPage,
        limit: 5,
      });
      if (!fetchedTransactions) {
        setLoading(true);
      }

      setTransactions(fetchedTransactions as { data: any; totalPages: number });
      setLoading(false);
    };
    fetchData();
  }, [userId, transactionPage, searchText]);

  // Fetch package data
  useEffect(() => {
    const fetchData = async () => {
      const currentPackage = await getPackageById(userId);
      setCurrentPackage(currentPackage as any);

      if (currentPackage !== null) {
        const today = new Date();
        const packageStartDate = new Date(currentPackage.startDate);
        const packageEndDate = new Date(currentPackage.endDate);
        // Add a grace period of 14 days to the package end date
        packageEndDate.setDate(packageEndDate.getDate() + 31);
        const hasPackage = today >= packageStartDate && today <= packageEndDate;
        setHasPackage(hasPackage);
      }

      if (hasPackage) {
        const userSessions = await computeSessionsLeft(
          userId,
          new Date(currentPackage.startDate),
          new Date(currentPackage.endDate),
          currentPackage.name,
        );

        if (userSessions) setNumberOfSessions(userSessions);
      }
    };

    fetchData();
  }, [userId, hasPackage]);

  // // Fetch data when component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userData = await getUserById(userId);
  //     setUser(userData);

  //     const attendanceData = await getAttendanceByStudent({
  //       studentId: userId,
  //       query: searchText,
  //       page: trainingPage,
  //       limit: 8,
  //     });
  //     setAttendance(attendanceData);

  //     const transactionsData = await getTransactionByStudent({
  //       studentId: userId,
  //       query: searchText,
  //       page: transactionPage,
  //       limit: 8,
  //     });
  //     setTransactions(transactionsData);

  //     const currentPackage = await getPackageById(userId);

  //     if (currentPackage !== null) {
  //       const today = new Date();
  //       const packageStartDate = new Date(currentPackage.startDate);
  //       const packageEndDate = new Date(currentPackage.endDate);
  //       // Add a grace period of 14 days to the package end date
  //       packageEndDate.setDate(packageEndDate.getDate() + 31);
  //       const hasPackage = today >= packageStartDate && today <= packageEndDate;
  //       setHasPackage(hasPackage);
  //     }

  //     if (hasPackage) {
  //       const userSessions = await computeSessionsLeft(
  //         userId,
  //         new Date(currentPackage.startDate),
  //         new Date(currentPackage.endDate),
  //         currentPackage.name,
  //       );
  //       setNumberOfSessions(userSessions);
  //     }
  //   };

  //   fetchData();
  // }, [userId, searchText, trainingPage, transactionPage]);

  // const attendance = (await getAttendanceByStudent({
  //   studentId: userId,
  //   query: searchText,
  //   page: trainingPage,
  //   limit: 8,
  // })) as { data: any; totalPages: number };
  // // console.log(attendance);

  // const transactions = (await getTransactionByStudent({
  //   studentId: userId,
  //   query: searchText,
  //   page: transactionPage,
  //   limit: 5,
  // })) as { data: any; totalPages: number };

  // // get Current Package from the database
  // const currentPackage = await getPackageById(userId);
  // // console.log(currentPackage);

  // // create a variable to track if the user has a package or not based on todays date and the package start date and end date
  // if (currentPackage !== null) {
  //   const today = new Date();
  //   const packageStartDate = new Date(currentPackage.startDate);
  //   const packageEndDate = new Date(currentPackage.endDate);
  //   // Add a grace period of 14 days to the package end date
  //   packageEndDate.setDate(packageEndDate.getDate() + 31);
  //   hasPackage = today >= packageStartDate && today <= packageEndDate;
  // }

  // if (hasPackage) {
  //   userSessions = await computeSessionsLeft(
  //     userId,
  //     new Date(currentPackage.startDate),
  //     new Date(currentPackage.endDate),
  //     currentPackage.name,
  //   );
  //   setNumberOfSessions(userSessions);
  // }
  if (loading) {
    return (
      // loaderCircle
      <div className="flex h-full w-full items-center justify-center">
        <LoaderCircle className="text-primary-500 h-8 w-8 animate-spin" />
      </div>
    );
  } else
    return (
      <>
        {user && (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center md:space-x-4">
              <Link
                className="mr-2 h-8 w-8 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out hover:bg-gray-200"
                href={`/dashboard/parent`}
              >
                <CircleChevronLeft />
              </Link>
              <h3 className="h3-bold">{user.firstName}&apos;s Dashboard</h3>
            </div>
          </div>
        )}
        {user && hasPackage ? (
          <>
            <div className="wrapper flex items-center space-x-4 p-6">
              <Image
                className="h-16 w-16 rounded-full"
                width={128}
                height={128}
                src={user.photo ?? ''}
                alt={`${user.firstName} ${user.lastName} Profile Picture`}
              />
              <div>
                <h2 className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>

            <section className="wrapper grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="flex text-sm font-medium">
                    Current Package
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {/* {hasPackage ? ( */}
                  <div className="flex items-center text-2xl font-bold">
                    {currentPackage.name}{" "}
                    {new Date().setHours(0, 0, 0, 0) <
                    new Date(currentPackage.endDate).setHours(0, 0, 0, 0) ? (
                      <Badge className="ml-2">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="ml-2">
                        Expired
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    availed{" "}
                    {new Date(currentPackage.startDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "Asia/Manila",
                      },
                    )}
                  </p>
                  {/* ) : (
                  <div className="text-2xl font-bold">No Active Package</div>
                )} */}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Number of Sessions Left
                  </CardTitle>
                  <Hash className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-2xl font-bold">
                    {numberOfSessions?.sessionsLeft}
                    {numberOfSessions &&
                      numberOfSessions.sessionsLeft !== undefined &&
                      numberOfSessions.sessionsLeft < 0 && (
                        <Badge variant="destructive" className="ml-2">
                          Session Overused
                        </Badge>
                      )}
                  </div>
                  {numberOfSessions?.lastAttendance &&
                  new Date(numberOfSessions.lastAttendance) >=
                    new Date(currentPackage.startDate) &&
                  new Date(numberOfSessions.lastAttendance) <=
                    new Date(currentPackage.endDate) ? (
                    <p className="text-xs text-muted-foreground">
                      last session availed{" "}
                      {new Date(
                        numberOfSessions.lastAttendance,
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "Asia/Manila",
                      })}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
              {numberOfSessions && numberOfSessions.sessionsLeft < 0 ? (
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Package Expiration
                    </CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {new Date(currentPackage.endDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "Asia/Manila",
                        },
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Package Status
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {currentPackage.paid ? (
                    <div className="inline-block rounded-full bg-green-500 px-4 py-2 font-bold text-white">
                      Paid
                    </div>
                  ) : (
                    <div className="inline-block rounded-full bg-red-500 px-4 py-2 font-bold text-white">
                      Unpaid
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </>
        ) : (
          <div className="wrapper m-4 text-center">
            <h4 className="h3-bold">No active package.</h4>
            <p className="mt-2">Enroll in package to get training discount.</p>
          </div>
        )}

        {/* My Tickets */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left">
              Training Sessions
            </h3>
          </div>
        </section>
        {attendance?.data.length > 0 ? (
          <div className="md:wrapper overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance?.data.map((data: any) => (
                  <TableRow key={data._id}>
                    <TableCell className="font-medium">
                      {new Date(data.trainingDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "Asia/Manila",
                      })}
                    </TableCell>
                    <TableCell>
                      {data.studentStatus === "present" ? (
                        <span className="rounded-full border border-green-500 bg-green-100 px-2 py-1 text-green-500">
                          Present
                        </span>
                      ) : data.studentStatus === "late" ? (
                        <span className="rounded-full border border-yellow-500 bg-yellow-100 px-2 py-1 text-yellow-500">
                          Late
                        </span>
                      ) : data.studentStatus === "excused" ? (
                        <span className="rounded-full border border-blue-500 bg-blue-100 px-2 py-1 text-blue-500">
                          Excused
                        </span>
                      ) : (
                        <span className="rounded-full border border-red-500 bg-red-100 px-2 py-1 text-red-500">
                          Absent
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {attendance?.totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  urlParamName={"trainingPage"}
                  page={trainingPage}
                  totalPages={attendance?.totalPages}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="wrapper flex justify-center overflow-x-auto">
            <p>You have not attended a training session yet.</p>
          </div>
        )}

        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left">Transactions</h3>
            {/* <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#training">Explore More Training</Link>
          </Button> */}
          </div>
        </section>

        {transactions.data.length > 0 ? (
          <div className="md:wrapper overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.data.map((data: any) => (
                  <TableRow key={data._id}>
                    <TableCell className="font-medium">
                      {new Date(data.transactionDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "Asia/Manila",
                        },
                      )}
                    </TableCell>
                    <TableCell>{data.incomeSource}</TableCell>
                    <TableCell>
                      ₱
                      {parseFloat(data.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>{data.paidIn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {transactions.totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  urlParamName={"transactionPage"}
                  page={transactionPage}
                  totalPages={transactions.totalPages}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="wrapper flex justify-center overflow-x-auto">
            <p>You have no transactions yet.</p>
          </div>
        )}
      </>
    );
};

export default Page;
