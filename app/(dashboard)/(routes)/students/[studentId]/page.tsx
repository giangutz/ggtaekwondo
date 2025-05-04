"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Mail,
  MapPin,
  Phone,
  Shield,
  TrendingUp,
  User,
  UserRound,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Types
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
  notes?: string;
  current_belt_id_id?: number;
  current_belt_id_name?: string;
  current_belt_id_color?: string;
  current_belt_id_rank?: number;
  next_belt_id_id?: number;
  next_belt_id_name?: string;
  next_belt_id_color?: string;
  next_belt_id_rank?: number;
}

interface Student {
  id: string;
  clerk_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  status: "active" | "inactive" | "trial" | "former";
  user_type: "student";
  age_group?: "child" | "teen" | "adult";
  profile_image_url?: string;
  medical_notes?: string;
  created_at: string;
  updated_at: string;
  student_progress?: StudentProgress[];
}

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.studentId as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudent(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  // Function to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (err) {
      return "Invalid date";
    }
  };

  // Function to get student's age
  const getAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return "Not set";
    try {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      return `${age} years`;
    } catch (err) {
      return "Invalid date";
    }
  };

  // Function to handle student deactivation
  const handleDeactivate = async () => {
    if (!confirm("Are you sure you want to deactivate this student?")) {
      return;
    }

    try {
      await axios.delete(`/api/students/${studentId}`);
      router.push("/students?status=inactive");
    } catch (err) {
      console.error("Error deactivating student:", err);
      alert("Failed to deactivate student. Please try again.");
    }
  };

  // Get the current belt from student progress
  const getCurrentBelt = () => {
    if (!student?.student_progress || student.student_progress.length === 0) {
      return {
        name: "Not assigned",
        color: "#e5e5e5"
      };
    }

    const progress = student.student_progress[0];
    return {
      name: progress.current_belt_id_name || "Unknown",
      color: progress.current_belt_id_color || "#e5e5e5"
    };
  };

  // Status badge color
  const getStatusColor = () => {
    if (!student) return "bg-gray-100 text-gray-800";

    switch (student.status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "trial":
        return "bg-blue-100 text-blue-800";
      case "former":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-7 w-40 mb-2" />
                <Skeleton className="h-5 w-60" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-28 w-28 rounded-full" />
                    <Skeleton className="h-5 w-20 mt-3" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-0">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="h-5 w-5 mt-0.5" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-28 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <Link href="/students" className="inline-block mb-6">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Students
          </Button>
        </Link>

        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Error Loading Student</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No student found
  if (!student) {
    return (
      <div>
        <Link href="/students" className="inline-block mb-6">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Students
          </Button>
        </Link>

        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center text-center">
              <UserRound className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
              <p className="text-gray-500 mb-6">
                The student you're looking for doesn't exist or has been
                removed.
              </p>
              <Link href="/students">
                <Button>View All Students</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get current belt information
  const currentBelt = getCurrentBelt();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link href="/students">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Students
          </Button>
        </Link>

        <Link href={`/students/${studentId}/edit`}>
          <Button className="gap-1">
            <Edit className="h-4 w-4" />
            Edit Student
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Student details */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {student.first_name} {student.last_name}
                  </CardTitle>
                  <CardDescription>{student.email}</CardDescription>
                </div>
                <Badge className={getStatusColor()}>
                  {student.status.charAt(0).toUpperCase() +
                    student.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  {student.profile_image_url ? (
                    <img
                      src={student.profile_image_url}
                      alt={`${student.first_name} ${student.last_name}`}
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl font-medium text-gray-500">
                        {student.first_name.charAt(0)}
                        {student.last_name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="mt-3 flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: currentBelt.color }}
                      />
                      <span className="font-medium">{currentBelt.name}</span>
                    </div>
                    {student.age_group && (
                      <span className="text-sm text-gray-500 mt-1">
                        {student.age_group.charAt(0).toUpperCase() +
                          student.age_group.slice(1)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-0">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {formatDate(student.created_at)}
                      </p>
                    </div>
                  </div>

                  {student.date_of_birth && (
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">
                          {formatDate(student.date_of_birth)} (
                          {getAge(student.date_of_birth)})
                        </p>
                      </div>
                    </div>
                  )}

                  {student.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{student.phone}</p>
                      </div>
                    </div>
                  )}

                  {student.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{student.address}</p>
                      </div>
                    </div>
                  )}

                  {student.emergency_contact && (
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Emergency Contact
                        </p>
                        <p className="font-medium">
                          {student.emergency_contact}
                          {student.emergency_phone &&
                            ` (${student.emergency_phone})`}
                        </p>
                      </div>
                    </div>
                  )}

                  {student.medical_notes && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Medical Notes</p>
                        <p className="font-medium">{student.medical_notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-end">
                {student.status !== "inactive" && (
                  <Button variant="destructive" onClick={handleDeactivate}>
                    Deactivate Student
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance history or class log could go here */}
        </div>

        {/* Right column - Belt progress & actions */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Belt Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {student.student_progress?.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: currentBelt.color }}
                      />
                      <span className="font-medium">{currentBelt.name}</span>
                    </div>

                    {student.student_progress[0].next_belt_id && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              student.student_progress[0].next_belt_id_color ||
                              "#e5e5e5"
                          }}
                        />
                        <span className="text-sm text-gray-500">
                          {student.student_progress[0].next_belt_id_name}
                        </span>
                      </div>
                    )}
                  </div>

                  {student.student_progress[0].last_grading_date && (
                    <div>
                      <p className="text-sm text-gray-500">Last Grading</p>
                      <p className="font-medium">
                        {formatDate(
                          student.student_progress[0].last_grading_date
                        )}
                      </p>
                    </div>
                  )}

                  {student.student_progress[0].next_grading_date && (
                    <div>
                      <p className="text-sm text-gray-500">Next Grading</p>
                      <p className="font-medium">
                        {formatDate(
                          student.student_progress[0].next_grading_date
                        )}
                      </p>
                    </div>
                  )}

                  {student.student_progress[0].eligible_for_promotion && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Eligible for Promotion
                    </Badge>
                  )}

                  {student.student_progress[0].notes && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Progress Notes</p>
                      <p className="text-sm mt-1">
                        {student.student_progress[0].notes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No belt progress information</p>
                  <Link href={`/students/${studentId}/edit`}>
                    <Button variant="outline" size="sm" className="mt-2">
                      Assign Belt
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link
                  href={`/attendance?student=${studentId}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Attendance
                  </Button>
                </Link>
                <Link
                  href={`/students/${studentId}/edit?section=belt`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Update Belt Progress
                  </Button>
                </Link>
                <Link
                  href={`/students/message?id=${studentId}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
