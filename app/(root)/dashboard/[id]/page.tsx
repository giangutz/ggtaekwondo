import { SearchParamProps } from "@/types";
import React from "react";
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
import { Activity, DollarSign, Hash } from "lucide-react";
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
import { redirect } from "next/navigation";
import Link from "next/link";


const Page = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const userId = id;
  const user = await getUserById(userId);
  let hasPackage = false;
  let numberOfSessions = null;

  const trainingPage = Number(searchParams?.trainingPage) || 1;
  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const searchText = (searchParams?.query as string) || "";

  const attendance = (await getAttendanceByStudent({
    studentId: userId,
    query: searchText,
    page: trainingPage,
    limit: 8,
  })) as { data: any; totalPages: number };
  // console.log(attendance);

  const transactions = (await getTransactionByStudent({
    studentId: userId,
    query: searchText,
    page: transactionPage,
    limit: 5,
  })) as { data: any; totalPages: number };

  // get Current Package from the database
  const currentPackage = await getPackageById(userId);
  // console.log(currentPackage);

  // create a variable to track if the user has a package or not based on todays date and the package start date and end date
  if (currentPackage !== null) {
    const today = new Date();
    const packageStartDate = new Date(currentPackage.startDate);
    const packageEndDate = new Date(currentPackage.endDate);
    hasPackage = today >= packageStartDate && today <= packageEndDate;
  }

  if (hasPackage) {
    numberOfSessions = await computeSessionsLeft(
      userId,
      new Date(currentPackage.startDate),
      new Date(currentPackage.endDate),
      currentPackage.name
    );
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center md:space-x-4">
          <Link
            className="mr-2 h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-colors duration-200 ease-in-out"
            href={`/dashboard/parent`}
          >
            <CircleChevronLeft />
          </Link>
          <h3 className="h3-bold">{user.firstName}&apos;s Dashboard</h3>
        </div>
      </div>
      {hasPackage ? (
        <>
          <div className="wrapper flex items-center space-x-4 p-6">
            <Image
              className="w-16 h-16 rounded-full"
              width={128}
              height={128}
              src={user.photo}
              alt={`${user.firstName} ${user.lastName} Profile Picture`}
            />
            <div>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>

          <section className="wrapper grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex">
                  Current Package
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {hasPackage ? (
                  <>
                    <div className="text-2xl font-bold">
                      {currentPackage.name}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      availed{" "}
                      {new Date(currentPackage.startDate).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </>
                ) : (
                  <div className="text-2xl font-bold">No Active Package</div>
                )}
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
                <div className="text-2xl font-bold">
                  {numberOfSessions?.sessionsLeft}
                </div>
                {numberOfSessions?.lastAttendance &&
                new Date(numberOfSessions.lastAttendance) >=
                  new Date(currentPackage.startDate) &&
                new Date(numberOfSessions.lastAttendance) <=
                  new Date(currentPackage.endDate) ? (
                  <p className="text-xs text-muted-foreground">
                    last session availed{" "}
                    {new Date(
                      numberOfSessions.lastAttendance
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                ) : null}
                {/* <div className="text-2xl font-bold">No Active Package</div> */}
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Status
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {currentPackage.paid ? (
                  <div className="inline-block px-4 py-2 rounded-full bg-green-500 text-white font-bold">
                    Paid
                  </div>
                ) : (
                  <div className="inline-block px-4 py-2 rounded-full bg-red-500 text-white font-bold">
                    Unpaid
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </>
      ) : (
        <div className="wrapper text-center m-4">
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
                    })}
                  </TableCell>
                  <TableCell>
                    {data.studentStatus === "present" ? (
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
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {attendance?.totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                urlParamName={"trainingPage"}
                page={trainingPage}
                totalPages={attendance?.totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="wrapper overflow-x-auto flex justify-center">
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
                      }
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
            <div className="flex justify-center mt-4">
              <Pagination
                urlParamName={"transactionPage"}
                page={transactionPage}
                totalPages={transactions.totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="wrapper overflow-x-auto flex justify-center">
          <p>You have no transactions yet.</p>
        </div>
      )}
    </>
  );
};

export default Page;
