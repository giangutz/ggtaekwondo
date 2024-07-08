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
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getPackageById } from "@/lib/actions/packages.actions";
import {
  computeSessionsLeft,
  getAttendanceByStudent,
} from "@/lib/actions/attendance.actions";
import { getUserMetadata } from "@/lib/utils";
import Pagination from "@/components/shared/Pagination";
import { getTransactionByStudent } from "@/lib/actions/transaction.actions";
import { Badge } from "@/components/ui/badge";
import { IPackage } from "@/lib/database/models/packages.model";
import { format } from "date-fns";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(percent);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent !== 0 && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded-md bg-white p-3 shadow-lg">
        <p className="label">{`${payload[0].name} : ${payload[0].value} ${payload[0].value !== 1 ? "sessions" : "session"}`}</p>
      </div>
    );
  }

  return null;
};

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const user = getUserMetadata();
  const userId = user?.userId as string;
  const [numberOfSessions, setNumberOfSessions] = useState<{
    sessionsLeft: number;
    lastAttendance: any;
  } | null>(null);
  const [data, setData] = useState<
    {
      name: string;
      value: any;
      color: string;
    }[]
  >([]);

  const [attendance, setAttendance] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const [transactions, setTransactions] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });
  const [hasPackage, setHasPackage] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<IPackage | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  const trainingPage = Number(searchParams?.trainingPage) || 1;
  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const searchText = (searchParams?.query as string) || "";
  // const eventsPage = Number(searchParams?.eventsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage });

  // const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  // const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  // Fetch attendance data
  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedAttendance = await getAttendanceByStudent({
        studentId: userId,
        query: searchText,
        page: trainingPage,
        limit: 12,
      });
      if (fetchedAttendance) {
        setAttendance(fetchedAttendance as { data: any; totalPages: number });
        // Calculate visualization data based on fetchedAttendance
        const presentCount = fetchedAttendance.data.filter(
          (data: any) => data.studentStatus === "present",
        ).length;
        const absentCount = fetchedAttendance.data.filter(
          (data: any) => data.studentStatus === "absent",
        ).length;
        const excusedCount = fetchedAttendance.data.filter(
          (data: any) => data.studentStatus === "excused",
        ).length;
        const lateCount = fetchedAttendance.data.filter(
          (data: any) => data.studentStatus === "late",
        ).length;

        // Transforming the counts into the structure expected by the PieChart
        const chartData = [
          { name: "Present", value: presentCount, color: "green" },
          { name: "Absent", value: absentCount, color: "red" },
          { name: "Excused", value: excusedCount, color: "blue" },
          { name: "Late", value: lateCount, color: "rgb(250 204 21)" },
        ];

        // Assuming there's a setState method for chartData
        setData(chartData); // Update your state or context with the new chart data
        // console.log(chartData);
      }
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
  // console.log(hasPackage);
  // init currentPackage to latest package based on start date

  return (
    <>
      {currentPackage && hasPackage && (
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
              {numberOfSessions?.lastAttendance && (
                <p className="text-xs text-muted-foreground">
                  last session availed{" "}
                  {new Date(numberOfSessions.lastAttendance).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "Asia/Manila",
                    },
                  )}
                </p>
              )}
            </CardContent>
          </Card>

          {numberOfSessions &&
            numberOfSessions?.sessionsLeft >= 0 &&
            currentPackage && (
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
            )}
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
      )}

      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Training Sessions
          </h3>
        </div>
      </section>
      <div className="mb-4 flex h-[350px] w-full flex-col items-center justify-center sm:h-[250px]">
        <p className="p-4 italic sm:text-center">
          Attendance Rate Overview from{" "}
          {new Date(
            attendance.data[attendance.data.length - 1]?.trainingDate,
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "Asia/Manila",
          })}{" "}
          to{" "}
          {new Date(attendance.data[0]?.trainingDate).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "Asia/Manila",
            },
          )}
        </p>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
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

      {/* My Tickets */}

      {/* <section className="wrapper my-4">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section> */}

      {/* Events Organized */}
      {/* <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section> */}
    </>
  );
};

export default ProfilePage;
