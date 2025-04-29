import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PlusCircle, Search, Filter } from "lucide-react";

export default function StudentsPage() {
  // This would come from a database in a real implementation
  const students = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      status: "active",
      belt: "Blue",
      age: "Adult",
      joinDate: "Jan 15, 2023"
    },
    {
      id: "2",
      name: "Sofia Garcia",
      email: "sofia@example.com",
      status: "active",
      belt: "Yellow",
      age: "Child",
      joinDate: "Mar 3, 2023"
    },
    {
      id: "3",
      name: "Marcus Wong",
      email: "marcus@example.com",
      status: "inactive",
      belt: "Brown",
      age: "Teen",
      joinDate: "Oct 12, 2022"
    },
    {
      id: "4",
      name: "Emma Thompson",
      email: "emma@example.com",
      status: "active",
      belt: "Red",
      age: "Child",
      joinDate: "Feb 20, 2023"
    },
    {
      id: "5",
      name: "Jamal Clark",
      email: "jamal@example.com",
      status: "trial",
      belt: "White",
      age: "Adult",
      joinDate: "Apr 5, 2023"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <Link href="/students/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
          <CardDescription>
            Find students by name, email, status, or belt rank
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name or email"
                className="pl-8"
              />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Belt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Belts</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="black">Black</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="teen">Teen</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>Showing {students.length} students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Belt</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div>{student.name}</div>
                    <div className="text-xs text-gray-500">{student.email}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : student.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {student.status === "active"
                        ? "Active"
                        : student.status === "inactive"
                          ? "Inactive"
                          : "Trial"}
                    </span>
                  </TableCell>
                  <TableCell>{student.belt}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/students/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
