"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { PlusCircle, Search, UserRound } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

// Type definitions
interface Belt {
  id: number;
  name: string;
  color: string;
  rank: number;
}

interface StudentProgress {
  id: string;
  current_belt_id: number;
  next_belt_id?: number;
  next_grading_date?: string;
  last_grading_date?: string;
  eligible_for_promotion: boolean;
  current_belt_id_id?: number;
  current_belt_id_name?: string;
  current_belt_id_color?: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "trial";
  age_group?: "child" | "teen" | "adult";
  created_at: string;
  student_progress?: StudentProgress[];
}

export default function StudentsPage() {
  // State for students and belts data
  const [students, setStudents] = useState<Student[]>([]);
  const [belts, setBelts] = useState<Belt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [beltFilter, setBeltFilter] = useState("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");

  // Router for navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load initial data
  useEffect(() => {
    // Set initial filter values from URL if available
    const queryValue = searchParams.get("query");
    const statusValue = searchParams.get("status");
    const beltValue = searchParams.get("belt_id");
    const ageGroupValue = searchParams.get("age_group");

    if (queryValue) setSearchQuery(queryValue);
    if (statusValue) setStatusFilter(statusValue);
    if (beltValue) setBeltFilter(beltValue);
    if (ageGroupValue) setAgeGroupFilter(ageGroupValue);

    // Fetch belts data
    const fetchBelts = async () => {
      try {
        const response = await axios.get("/api/belts");
        setBelts(response.data);
      } catch (err) {
        console.error("Error fetching belts:", err);
        setError("Failed to load belt data");
      }
    };

    fetchBelts();
    fetchStudents();
  }, [searchParams]);

  // Function to fetch students with filters
  const fetchStudents = async () => {
    setLoading(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();

      if (searchQuery) params.append("query", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (beltFilter !== "all") params.append("belt_id", beltFilter);
      if (ageGroupFilter !== "all") params.append("age_group", ageGroupFilter);

      const response = await axios.get(`/api/students?${params.toString()}`);
      setStudents(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load student data");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters();
  };

  // Function to update filters in URL and fetch data
  const updateFilters = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.append("query", searchQuery);
    if (statusFilter !== "all") params.append("status", statusFilter);
    if (beltFilter !== "all") params.append("belt_id", beltFilter);
    if (ageGroupFilter !== "all") params.append("age_group", ageGroupFilter);

    router.push(`/students?${params.toString()}`);
    fetchStudents();
  };

  // Helper function to get belt name from student data
  const getBeltName = (student: Student) => {
    if (!student.student_progress || student.student_progress.length === 0) {
      return "Not assigned";
    }

    const progress = student.student_progress[0];
    return progress.current_belt_id_name || "Unknown";
  };

  // Helper function to get belt color from student data
  const getBeltColor = (student: Student) => {
    if (!student.student_progress || student.student_progress.length === 0) {
      return "#e5e5e5";
    }

    const progress = student.student_progress[0];
    return progress.current_belt_id_color || "#e5e5e5";
  };

  // Function to format the join date
  const formatJoinDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (err) {
      return "Invalid date";
    }
  };

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
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name or email"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setTimeout(updateFilters, 0);
              }}
            >
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

            <Select
              value={beltFilter}
              onValueChange={(value) => {
                setBeltFilter(value);
                setTimeout(updateFilters, 0);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Belt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Belts</SelectItem>
                {belts.map((belt) => (
                  <SelectItem key={belt.id} value={String(belt.id)}>
                    {belt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={ageGroupFilter}
              onValueChange={(value) => {
                setAgeGroupFilter(value);
                setTimeout(updateFilters, 0);
              }}
            >
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

            <div className="md:col-span-4">
              <Button type="submit">Apply Filters</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            {loading
              ? "Loading students..."
              : `Showing ${students.length} students`}
          </CardDescription>
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
              {loading ? (
                // Loading skeletons
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-16 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UserRound className="h-10 w-10 text-gray-400" />
                      <h3 className="font-medium text-gray-900">
                        No students found
                      </h3>
                      <p className="text-sm text-gray-500">
                        {searchQuery ||
                        statusFilter !== "all" ||
                        beltFilter !== "all" ||
                        ageGroupFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Start by adding a new student"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-700 font-medium">
                            {student.first_name.charAt(0)}
                            {student.last_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div>
                            {student.first_name} {student.last_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: getBeltColor(student) }}
                        />
                        {getBeltName(student)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.age_group
                        ? student.age_group.charAt(0).toUpperCase() +
                          student.age_group.slice(1)
                        : "Not set"}
                    </TableCell>
                    <TableCell>{formatJoinDate(student.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/students/${student.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
