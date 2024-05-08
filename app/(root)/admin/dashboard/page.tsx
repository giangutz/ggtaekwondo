"use client";
import { ArrowLeftRight, Package2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/shared/CalendarDateRangePicker";
import React, { useState, useEffect } from "react";
import CreatePackage from "@/components/shared/CreatePackage";
import DeletePackage from "@/components/shared/DeletePackage";
import { IUser } from "@/lib/database/models/user.model";
import { getAllPackages } from "@/lib/actions/packages.actions";
import { IClass } from "@/lib/database/models/class.model";
import CreateAttendance from "@/components/shared/CreateAttendance";
import DeleteAttendance from "@/components/shared/DeleteAttendance";
import { getAllUser } from "@/lib/actions/user.actions";
import { getAllUserTypes } from "@/lib/actions/usertype.actions";
import { getAllAttendance } from "@/lib/actions/attendance.actions";
import { getAllClass } from "@/lib/actions/class.actions";
import { getAllTransactions } from "@/lib/actions/transaction.actions";
import CreateTransactions from "@/components/shared/CreateTransactions";
import DeleteTransaction from "@/components/shared/DeleteTransaction";
import { SearchParamProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const AdminDBoard = ({ searchParams }: SearchParamProps) => {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [attendance, setAttendance] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const [classes, setClasses] = useState([]);
  const [packages, setPackages] = useState<{ data: any; totalPages: number }>({
    data: [],
    totalPages: 0,
  });
  const [transactions, setTransactions] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });

  const attendancePage = Number(searchParams?.attendancePage) || 1;
  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const packagePage = Number(searchParams?.packagePage) || 1;
  const searchText = (searchParams?.query as string) || "";

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserTypes = await getAllUserTypes();
      const fetchedUsers = await getAllUser();
      // const fetchedAttendance = await getAllAttendance({
      //   query: searchText,
      //   page: attendancePage,
      //   limit: 8,
      // });
      const fetchedClasses = await getAllClass();
      // const fetchedPackages = await getAllPackages();
      // const fetchTransactions = await getAllTransactions();

      setUsers(fetchedUsers);
      setUserTypes(fetchedUserTypes);
      // setAttendance(fetchedAttendance);
      setClasses(fetchedClasses);
      // setPackages(fetchedPackages);
      // setTransactions(fetchTransactions);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAttendance = await getAllAttendance({
        query: searchText,
        page: attendancePage,
        limit: 10,
      });

      setAttendance(fetchedAttendance as { data: any; totalPages: number });
    };

    fetchData();
  }, [attendancePage, searchText]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPackages = await getAllPackages({
        query: searchText,
        page: packagePage,
        limit: 10,
      });
      setPackages(fetchedPackages as { data: any; totalPages: number });
    };

    fetchData();
  }, [packagePage, searchText]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTransactions = await getAllTransactions({
        query: searchText,
        page: transactionPage,
        limit: 5,
      });
      setTransactions(fetchedTransactions as { data: any; totalPages: number });
    };

    fetchData();
  }, [transactionPage, searchText]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger className="hover:bg-white" value="attendance">
            <span className="hidden sm:block">Attendance</span>
            <UserCheck className="sm:hidden" height={20} width={20} />
          </TabsTrigger>
          <TabsTrigger className="hover:bg-white" value="packages">
            <span className="hidden sm:block">Packages</span>
            <Package2 className="sm:hidden" height={20} width={20} />
          </TabsTrigger>
          <TabsTrigger className="hover:bg-white" value="transactions">
            <span className="hidden sm:block">Transactions</span>
            <ArrowLeftRight className="sm:hidden" height={20} width={20} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <RecentSales /> */}</CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="attendance" className="">
          <section className="sm:hidden bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">Attendance</h3>
            </div>
          </section>
          {attendance?.data.length > 0 ? (
            <div className="md:wrapper overflow-x-auto">
              <Table>
                {/* <TableCaption>A list of Attendance of the Students</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.data.map((data: any) => (
                    <TableRow key={data._id}>
                      <TableCell className="font-medium">
                        {new Date(data.trainingDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {
                          (
                            classes.find(
                              (cls: any) => cls._id === data.class
                            ) as any
                          )?.name
                        }
                      </TableCell>
                      <TableCell className="flex justify-between">
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
        </TabsContent>
        <TabsContent value="packages" className="space-y-4">
          <section className="sm:hidden bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">
                Student Packages
              </h3>
            </div>
          </section>
          {packages?.data.length > 0 ? (
            <div className="md:wrapper overflow-x-auto">
              <Table>
                {/* <TableCaption>A list of Attendance of the Students</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Package
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Start Date
                    </TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.data.map((data: any) => {
                    const user = users.find(
                      (user: IUser) => user._id === data.studentId
                    ) as IUser | undefined;
                    const userClass = classes.find(
                      (cls: IClass) => cls._id === user?.class
                    ) as IClass | undefined;
                    const classId = userClass?._id;
                    const isExpired = new Date(data.endDate) < new Date();

                    return (
                      <TableRow
                        key={data._id}
                        className={isExpired ? "bg-gray-200" : ""}
                      >
                        <TableCell className="font-medium">
                          {
                            (
                              users.find(
                                (user: IUser) => user._id === data.studentId
                              ) as IUser | undefined
                            )?.firstName
                          }{" "}
                          {
                            (
                              users.find(
                                (user: IUser) => user._id === data.studentId
                              ) as IUser | undefined
                            )?.lastName
                          }
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {
                            packages.data.find(
                              (pkg: any) => pkg.studentId === data.studentId
                            )?.name
                          }{" "}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
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
                          <span className="hidden sm:inline">
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
                        <TableCell>
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
                        <TableCell className="flex justify-between align-middle">
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
              <p>There is no package registered in the system yet.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <section className="sm:hidden bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">Transactions</h3>
            </div>
          </section>
          {transactions?.data.length > 0 ? (
            <div className="md:wrapper overflow-x-auto">
              <Table>
                {/* <TableCaption>
                  A list of Expenses made from the gym.
                </TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.data.map((transaction: any) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">
                        <span className="sm:hidden">
                          {new Date(
                            transaction.transactionDate
                          ).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="hidden sm:inline">
                          {new Date(
                            transaction.transactionDate
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        {transaction.incomeSource ||
                          transaction.expenseCategory}
                      </TableCell>
                      <TableCell>
                        ₱
                        {parseFloat(transaction.amount).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </TableCell>
                      <TableCell>{transaction.paidIn}</TableCell>
                      <TableCell className="flex justify-between align-middle">
                        <CreateTransactions transaction={transaction} />
                        <DeleteTransaction transaction={transaction} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {transactions?.totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    urlParamName={"transactionPage"}
                    page={transactionPage}
                    totalPages={transactions?.totalPages}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="wrapper overflow-x-auto flex justify-center">
              <p>There is no transactions made in the system yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDBoard;
