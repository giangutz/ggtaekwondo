import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Calendar, Users } from "lucide-react";

export default function ClassesPage() {
  // This would come from a database in a real implementation
  const regularClasses = [
    {
      id: "1",
      name: "Children's Beginner",
      instructor: "Master Lee",
      day: "Monday, Wednesday, Friday",
      time: "4:00 PM - 5:00 PM",
      ageGroup: "Child",
      beltRange: "White - Yellow",
      capacity: 20
    },
    {
      id: "2",
      name: "Children's Intermediate",
      instructor: "Master Chen",
      day: "Tuesday, Thursday",
      time: "4:30 PM - 5:30 PM",
      ageGroup: "Child",
      beltRange: "Blue - Red",
      capacity: 15
    },
    {
      id: "3",
      name: "Teen All Levels",
      instructor: "Master Lee",
      day: "Monday, Wednesday, Friday",
      time: "5:30 PM - 6:30 PM",
      ageGroup: "Teen",
      beltRange: "All Belts",
      capacity: 18
    },
    {
      id: "4",
      name: "Adult Beginner",
      instructor: "Master Rodriguez",
      day: "Tuesday, Thursday",
      time: "6:00 PM - 7:00 PM",
      ageGroup: "Adult",
      beltRange: "White - Yellow",
      capacity: 20
    },
    {
      id: "5",
      name: "Adult Advanced",
      instructor: "Master Kim",
      day: "Monday, Wednesday, Friday",
      time: "7:00 PM - 8:30 PM",
      ageGroup: "Adult",
      beltRange: "Blue - Black",
      capacity: 15
    }
  ];

  // Upcoming class instances (specific dates)
  const upcomingClasses = [
    {
      id: "101",
      name: "Children's Beginner",
      instructor: "Master Lee",
      date: "May 1, 2023",
      time: "4:00 PM - 5:00 PM",
      status: "scheduled",
      enrolled: 15,
      capacity: 20
    },
    {
      id: "102",
      name: "Adult Advanced",
      instructor: "Master Kim",
      date: "May 1, 2023",
      time: "7:00 PM - 8:30 PM",
      status: "scheduled",
      enrolled: 12,
      capacity: 15
    },
    {
      id: "103",
      name: "Teen All Levels",
      instructor: "Master Lee",
      date: "May 3, 2023",
      time: "5:30 PM - 6:30 PM",
      status: "scheduled",
      enrolled: 10,
      capacity: 18
    },
    {
      id: "104",
      name: "Children's Intermediate",
      instructor: "Master Chen",
      date: "May 4, 2023",
      time: "4:30 PM - 5:30 PM",
      status: "scheduled",
      enrolled: 8,
      capacity: 15
    },
    {
      id: "105",
      name: "Special Belt Test Prep",
      instructor: "Master Rodriguez",
      date: "May 6, 2023",
      time: "10:00 AM - 12:00 PM",
      status: "special",
      enrolled: 25,
      capacity: 30
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Link href="/classes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="schedule" className="mb-6">
        <TabsList>
          <TabsTrigger value="schedule">
            <Calendar className="mr-2 h-4 w-4" />
            Regular Schedule
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <Calendar className="mr-2 h-4 w-4" />
            Upcoming Classes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Regular Class Schedule</CardTitle>
              <CardDescription>
                These classes run on a regular weekly schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Age Group</TableHead>
                    <TableHead>Belt Range</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.instructor}</TableCell>
                      <TableCell>{classItem.day}</TableCell>
                      <TableCell>{classItem.time}</TableCell>
                      <TableCell>{classItem.ageGroup}</TableCell>
                      <TableCell>{classItem.beltRange}</TableCell>
                      <TableCell>{classItem.capacity}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/classes/${classItem.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                          <Link href={`/classes/${classItem.id}/students`}>
                            <Button variant="ghost" size="sm">
                              <Users className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>
                Specific class instances for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.instructor}</TableCell>
                      <TableCell>{classItem.date}</TableCell>
                      <TableCell>{classItem.time}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            classItem.status === "special"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {classItem.status === "special"
                            ? "Special Event"
                            : "Scheduled"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {classItem.enrolled}/{classItem.capacity}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              classItem.enrolled / classItem.capacity > 0.85
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${(classItem.enrolled / classItem.capacity) * 100}%`
                            }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/classes/instance/${classItem.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                          <Link
                            href={`/classes/instance/${classItem.id}/attendance`}
                          >
                            <Button variant="ghost" size="sm">
                              Attendance
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
