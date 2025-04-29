import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Search, Calendar, UserCheck, UserX, Clock } from "lucide-react";

export default function AttendancePage() {
  // This would come from a database in a real implementation
  const todayClasses = [
    {
      id: "101",
      name: "Children's Beginner",
      time: "4:00 PM - 5:00 PM",
      instructor: "Master Lee",
      location: "Main Dojo",
      status: "in-progress",
      enrolled: 20,
      present: 15
    },
    {
      id: "102",
      name: "Adult Advanced",
      time: "7:00 PM - 8:30 PM",
      instructor: "Master Kim",
      location: "Main Dojo",
      status: "upcoming",
      enrolled: 15,
      present: 0
    }
  ];

  const recentClasses = [
    {
      id: "98",
      name: "Teen All Levels",
      date: "Apr 28, 2023",
      time: "5:30 PM - 6:30 PM",
      instructor: "Master Lee",
      enrolled: 18,
      present: 16,
      absentStudents: 2
    },
    {
      id: "99",
      name: "Children's Intermediate",
      date: "Apr 28, 2023",
      time: "4:30 PM - 5:30 PM",
      instructor: "Master Chen",
      enrolled: 15,
      present: 13,
      absentStudents: 2
    },
    {
      id: "100",
      name: "Adult Beginner",
      date: "Apr 28, 2023",
      time: "6:00 PM - 7:00 PM",
      instructor: "Master Rodriguez",
      enrolled: 20,
      present: 17,
      absentStudents: 3
    }
  ];

  const attendanceStatsByStudent = [
    {
      id: "1",
      name: "Alex Johnson",
      totalClasses: 45,
      attendedClasses: 42,
      attendanceRate: "93%",
      lastAttended: "Apr 28, 2023",
      streak: 8
    },
    {
      id: "2",
      name: "Sofia Garcia",
      totalClasses: 40,
      attendedClasses: 38,
      attendanceRate: "95%",
      lastAttended: "Apr 28, 2023",
      streak: 12
    },
    {
      id: "3",
      name: "Marcus Wong",
      totalClasses: 38,
      attendedClasses: 30,
      attendanceRate: "79%",
      lastAttended: "Apr 25, 2023",
      streak: 0
    },
    {
      id: "4",
      name: "Emma Thompson",
      totalClasses: 42,
      attendedClasses: 40,
      attendanceRate: "95%",
      lastAttended: "Apr 28, 2023",
      streak: 10
    },
    {
      id: "5",
      name: "Jamal Clark",
      totalClasses: 10,
      attendedClasses: 8,
      attendanceRate: "80%",
      lastAttended: "Apr 27, 2023",
      streak: 3
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attendance Tracking</h1>

      <Tabs defaultValue="today" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="today">
            <Clock className="mr-2 h-4 w-4" />
            Today&apos;s Classes
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Calendar className="mr-2 h-4 w-4" />
            Recent Classes
          </TabsTrigger>
          <TabsTrigger value="students">
            <UserCheck className="mr-2 h-4 w-4" />
            Student Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Classes</CardTitle>
              <CardDescription>
                Track attendance for today&apos;s scheduled classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.time}</TableCell>
                      <TableCell>{classItem.instructor}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            classItem.status === "in-progress"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {classItem.status === "in-progress"
                            ? "In Progress"
                            : "Upcoming"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {classItem.present}/{classItem.enrolled} Present
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/attendance/class/${classItem.id}`}>
                          <Button>Take Attendance</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Class Attendance</CardTitle>
              <CardDescription>
                View attendance records for recent classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Absent Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.date}</TableCell>
                      <TableCell>{classItem.time}</TableCell>
                      <TableCell>{classItem.instructor}</TableCell>
                      <TableCell>
                        {classItem.present}/{classItem.enrolled} (
                        {Math.round(
                          (classItem.present / classItem.enrolled) * 100
                        )}
                        %)
                      </TableCell>
                      <TableCell>
                        {classItem.absentStudents > 0 ? (
                          <span className="flex items-center text-amber-600">
                            <UserX className="mr-1 h-4 w-4" />
                            {classItem.absentStudents} students
                          </span>
                        ) : (
                          <span className="text-green-600">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/attendance/history/${classItem.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance Stats</CardTitle>
              <CardDescription>
                View attendance statistics by student
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by student name"
                  className="pl-8"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Classes Attended</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Last Attended</TableHead>
                    <TableHead>Current Streak</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceStatsByStudent.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        {student.attendedClasses}/{student.totalClasses}
                      </TableCell>
                      <TableCell
                        className={
                          parseInt(student.attendanceRate) < 80
                            ? "text-amber-600"
                            : "text-green-600"
                        }
                      >
                        {student.attendanceRate}
                      </TableCell>
                      <TableCell>{student.lastAttended}</TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            student.streak > 0
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {student.streak}{" "}
                          {student.streak === 1 ? "class" : "classes"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/students/${student.id}/attendance`}>
                          <Button variant="outline" size="sm">
                            View History
                          </Button>
                        </Link>
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
