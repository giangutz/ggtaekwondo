"use client";
import { CirclePlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/shared/CalendarDateRangePicker";
import React, { useState, useEffect } from "react";
import { getAllPackages } from "@/lib/actions/packages.actions";
import { getAllUser } from "@/lib/actions/user.actions";
import { getAllAttendance, getMonthlyAttendanceRateForAllClasses } from "@/lib/actions/attendance.actions";
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

const AdminDBoard = ({ searchParams }: SearchParamProps) => {
  const [users, setUsers] = useState([]);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  const [attendance, setAttendance] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const [classes, setClasses] = useState([]);
  const [packages, setPackages] = useState<{ data: any; totalPages: number }>({
    data: [],
    totalPages: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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
      const fetchedAttendance = await getAllAttendance({
        query: searchText,
        page: attendancePage,
        limit: 10,
      });

      setAttendance(fetchedAttendance as { data: any; totalPages: number });
    };

    fetchData();
  }, [attendancePage, searchText, dateRange]);

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

      const fetchAttendance: any = await getMonthlyAttendanceRateForAllClasses();
      console.log(fetchAttendance)
      setAttendance(fetchAttendance);
      setTransactions(fetchedTransactions);
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (date: any) => {
    setSelectedMonth(date);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex md:flex-row items-start md:items-center justify-between md:space-x-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm flex items-center px-2 md:px-4 py-1 md:py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 ease-in-out cursor-pointer">
            <span>Manage</span> <CirclePlus className="ml-2 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 bg-white shadow-md rounded-md overflow-hidden">
            {adminLinks.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className="block px-2 md:px-4 py-1 md:py-2 text-gray-800 hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer"
              >
                <Link href={item.route} onClick={(e) => e.stopPropagation()}>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            {/* <DropdownMenuItem className="block px-2 md:px-4 py-1 md:py-2 text-gray-800 hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer">
              <Link
                href="/admin/student-package"
                onClick={(e) => e.stopPropagation()}
              >
                Student Package
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="block px-2 md:px-4 py-1 md:py-2 text-gray-800 hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer">
              <Link
                href="/admin/transactions"
                onClick={(e) => e.stopPropagation()}
              >
                Transactions
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-center rounded-full bg-grey-50">
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
      {/* <CalendarDateRangePicker
        dateRange={{ from: dateRange.startDate, to: dateRange.endDate }}
        onDateRangeChange={(newRange) =>
          setDateRange({ startDate: newRange.from, endDate: newRange.to })
        }
      /> */}
      <div className="space-y-4">
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
              <div className="text-2xl font-bold">
                ₱
                {parseFloat(transactions?.totalRevenue).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {transactions?.revenuePercentage}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
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
              <div className="text-2xl font-bold">
                ₱
                {parseFloat(transactions?.totalExpenses).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p> */}
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
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
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
              <CardTitle>Income Percentage by Category</CardTitle>
            </CardHeader>
            <CardContent className="pl-2"><Overview /></CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>{/* <RecentSales /> */}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDBoard;
