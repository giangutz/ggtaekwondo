import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getCategoryById } from "@/lib/actions/category.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  Hash,
} from "lucide-react";
import { getPackageById } from "@/lib/actions/packages.actions";
import {
  computeSessionsLeft,
  getAttendanceByStudent,
} from "@/lib/actions/attendance.actions";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  let hasPackage = false;
  let numberOfSessions = null;

  // const ordersPage = Number(searchParams?.ordersPage) || 1;
  // const eventsPage = Number(searchParams?.eventsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage });

  // const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  // const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  // get all training date and status from attendance
  const attendance = await getAttendanceByStudent(userId);

  // get Current Package from the database
  const currentPackage = await getPackageById({ userId });

  // create a variable to track if the user has a package or not based on todays date and the package start date and end date
  if (currentPackage.length > 0) {
    const today = new Date();
    const packageStartDate = new Date(currentPackage[0].startDate);
    const packageEndDate = new Date(currentPackage[0].endDate);
    hasPackage = today >= packageStartDate && today <= packageEndDate;
  }

  if (hasPackage) {
    numberOfSessions = await computeSessionsLeft(
      userId,
      new Date(currentPackage[0].startDate),
      new Date(currentPackage[0].endDate),
      currentPackage[0].name
    );
  }

  // init currentPackage to latest package based on start date

  return (
    <>
      {/* Packages */}
      <section className="wrapper grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Package
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
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
            {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {hasPackage ? (
              <>
                <div className="text-2xl font-bold">
                  {numberOfSessions?.sessionsLeft}
                </div>
                <p className="text-xs text-muted-foreground">
                  last session availed{" "}
                  {new Date(
                    numberOfSessions?.lastAttendance
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">No Active Package</div>
            )}
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
            {hasPackage ? (
              <>
                <div className="text-2xl font-bold">
                  {new Date(currentPackage[0].endDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p> */}
              </>
            ) : (
              <div className="text-2xl font-bold">No Active Package</div>
            )}
          </CardContent>
        </Card>
        {/* <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card> */}
      </section>
      {/* <section className="wrapper">
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

      <div className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="py-3">Date</th>
              {/* <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event Title</th>
        <th className="min-w-[150px] py-3 text-left">Buyer</th>
        <th className="min-w-[100px] py-3 text-left">Created</th> */}
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((data: any) => (
              <tr
                key={data._id}
                className="p-regular-14 lg:p-regular-16 border-b justify-between"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
