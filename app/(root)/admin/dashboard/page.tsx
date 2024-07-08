"use client";
import { CirclePlus, Hash, DollarSign, HandCoins } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { getAllPackages } from "@/lib/actions/packages.actions";
import {
  getAllUser,
  getTotalNumberOfStudents,
} from "@/lib/actions/user.actions";
import {
  getMonthlyAttendanceRateForAllClasses,
  getMostActiveStudent,
} from "@/lib/actions/attendance.actions";
import { getAllClass } from "@/lib/actions/class.actions";
import { getTransactionByMonth } from "@/lib/actions/transaction.actions";
import { SearchParamProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { adminLinks } from "@/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { Overview } from "@/components/shared/Overview";
import { MostActiveStudent } from "@/components/shared/MostActiveStudent";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDBoard = ({ searchParams }: SearchParamProps) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [packages, setPackages] = useState<{ data: any; totalPages: number }>({
    data: [],
    totalPages: 0,
  });
  const [transactions, setTransactions] = useState<
    | {
        totalRevenue: any;
        revenuePercentage: number;
        totalExpenses: any;
        incomePercentageByCategory: {
          [k: string]: number;
        };
        transactionRecords: any;
      }
    | undefined
  >(undefined);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [mostActiveStudent, setMostActiveStudent] = useState([]);
  const [numStudents, setNumStudents] = useState({
    totalNumberOfStudents: 0,
    newSignUpsThisMonth: 0,
  });

  const attendancePage = Number(searchParams?.attendancePage) || 1;
  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const packagePage = Number(searchParams?.packagePage) || 1;
  const searchText = (searchParams?.query as string) || "";

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getAllUser();
      const fetchedClasses = await getAllClass();

      setUsers(fetchedUsers);
      setClasses(fetchedClasses);
    };

    fetchData();
  }, []);

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
  }, [packagePage, searchText, dateRange]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTransactions: any = await getTransactionByMonth({
        monthSelected: selectedMonth,
      });

      const fetchAttendance: any =
        await getMonthlyAttendanceRateForAllClasses();
      const fetchMostActive: any = await getMostActiveStudent();
      const fetchedUsers = await getTotalNumberOfStudents();

      if (
        !(
          fetchAttendance &&
          fetchMostActive &&
          fetchedTransactions &&
          fetchedUsers
        )
      ) {
        setLoading(true);
      }

      setNumStudents(
        fetchedUsers ?? { totalNumberOfStudents: 0, newSignUpsThisMonth: 0 },
      );
      setMostActiveStudent(fetchMostActive);
      setAttendance(fetchAttendance);
      setTransactions(fetchedTransactions);
      setLoading(false);
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (date: any) => {
    setSelectedMonth(date);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-start justify-between md:flex-row md:items-center md:space-x-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center rounded-md bg-orange-500 px-2 py-1 text-sm text-white transition-colors duration-200 ease-in-out hover:bg-orange-600 md:px-4 md:py-2">
            <span>Manage</span> <CirclePlus className="ml-2 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 overflow-hidden rounded-md bg-white shadow-md">
            {adminLinks.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className="block cursor-pointer px-2 py-1 text-gray-800 transition-colors duration-200 ease-in-out hover:bg-gray-200 md:px-4 md:py-2"
              >
                <Link href={item.route} onClick={(e) => e.stopPropagation()}>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-center bg-grey-50 rounded-full">
        <Image
          src="/assets/icons/calendar.svg"
          alt="calendar"
          width={24}
          height={24}
          className="filter-grey"
        />
        <DatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          wrapperClassName="datePicker"
        />
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    ₱
                    {parseFloat(transactions?.totalRevenue).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(transactions?.revenuePercentage || 0)}% from
                    last month
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <HandCoins className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    ₱
                    {parseFloat(transactions?.totalExpenses).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Number of Students
              </CardTitle>
              <Hash className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{numStudents?.totalNumberOfStudents}</div>
                  <p className="text-xs text-muted-foreground">Overall total of students in all classes</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Number of New Students</CardTitle>
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
              <div className="text-2xl font-bold">{numStudents?.newSignUpsThisMonth}</div>
              <p className="text-xs text-muted-foreground">
                New students this month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full md:col-span-4">
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-1/2" />
                  <Skeleton className="h-12 w-1/4" />
                  <Skeleton className="h-12 w-1/3" />
                  <Skeleton className="h-12 w-2/3" />
                  <Skeleton className="h-12 w-1/2" />
                </div>
              ) : (
                <Overview
                  data={transactions?.incomePercentageByCategory || []}
                />
              )}
            </CardContent>
          </Card>
          <Card className="col-span-full md:col-span-3">
            <CardHeader>
              <CardTitle>Most Active Students</CardTitle>
              {/* <CardDescription>Listed from mos</CardDescription> */}
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <MostActiveStudent
                  data={mostActiveStudent as { _id: string; total: number }[]}
                  users={users}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDBoard;
