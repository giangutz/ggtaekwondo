import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
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

import { Activity, CreditCard, Hash } from "lucide-react";
import { getPackageById } from "@/lib/actions/packages.actions";
import {
  computeSessionsLeft,
  getAttendanceByStudent,
} from "@/lib/actions/attendance.actions";
import { getUserMetadata } from "@/lib/utils";
import Pagination from "@/components/shared/Pagination";
import { getTransactionByStudent } from "@/lib/actions/transaction.actions";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const user = getUserMetadata();
  const userId = user?.userId as string;
  let hasPackage = false;
  let numberOfSessions = null;

  const trainingPage = Number(searchParams?.trainingPage) || 1;
  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const searchText = (searchParams?.query as string) || "";
  // const eventsPage = Number(searchParams?.eventsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage });

  // const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  // const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  // get all training date and status from attendance
  // let attendance = await getAttendanceByStudent(userId);
  const attendance = (await getAttendanceByStudent({
    studentId: userId,
    query: searchText,
    page: trainingPage,
    limit: 5,
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
  console.log(currentPackage);

  // create a variable to track if the user has a package or not based on todays date and the package start date and end date
  if (currentPackage.length > 0) {
    const today = new Date();
    const packageStartDate = new Date(currentPackage[0].startDate);
    const packageEndDate = new Date(currentPackage[0].endDate);
    hasPackage = today >= packageStartDate && today <= packageEndDate;
  }
  // console.log(hasPackage);
  if (hasPackage) {
    numberOfSessions = await computeSessionsLeft(
      userId,
      new Date(currentPackage[0].startDate),
      new Date(currentPackage[0].endDate),
      currentPackage[0].name
    );
  }
  // console.log(hasPackage);
  // init currentPackage to latest package based on start date

  return (
    <>
      {hasPackage ? (
        <>
          <section className="wrapper grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Package
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {hasPackage ? (
                  <>
                    <div className="text-2xl font-bold">
                      {currentPackage[0].name}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      availed{" "}
                      {new Date(currentPackage[0].startDate).toLocaleDateString(
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
                  new Date(currentPackage[0].startDate) &&
                new Date(numberOfSessions.lastAttendance) <=
                  new Date(currentPackage[0].endDate) ? (
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
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Package Expiration
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(currentPackage[0].endDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </div>
                {/* <div className="text-2xl font-bold">No Active Package</div> */}
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
          {/* <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#training">Explore More Training</Link>
          </Button> */}
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
