"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";

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
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  status: string;
  user_type: string;
  age_group?: string;
  medical_notes?: string;
  student_progress?: StudentProgress[];
}

// Form schemas
const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  address: z.string().optional(),
  status: z.string(),
  age_group: z.string().optional()
});

const emergencyInfoSchema = z.object({
  emergency_contact: z.string().optional(),
  emergency_phone: z.string().optional(),
  medical_notes: z.string().optional()
});

const beltProgressSchema = z.object({
  belt_id: z.number().optional(),
  next_belt_id: z.number().optional(),
  next_grading_date: z.string().optional(),
  last_grading_date: z.string().optional(),
  eligible_for_promotion: z.boolean().default(false),
  progress_notes: z.string().optional()
});

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const initialTab = searchParams.get("section") || "personal";

  const studentId = params.studentId as string;
  const isNewStudent = studentId === "new";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [student, setStudent] = useState<Student | null>(null);
  const [belts, setBelts] = useState<Belt[]>([]);
  const [loading, setLoading] = useState(!isNewStudent);
  const [submitting, setSubmitting] = useState(false);

  // Create the form instances
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      address: "",
      status: "active",
      age_group: ""
    }
  });

  const emergencyInfoForm = useForm<z.infer<typeof emergencyInfoSchema>>({
    resolver: zodResolver(emergencyInfoSchema),
    defaultValues: {
      emergency_contact: "",
      emergency_phone: "",
      medical_notes: ""
    }
  });

  const beltProgressForm = useForm<z.infer<typeof beltProgressSchema>>({
    resolver: zodResolver(beltProgressSchema),
    defaultValues: {
      belt_id: undefined,
      next_belt_id: undefined,
      next_grading_date: "",
      last_grading_date: "",
      eligible_for_promotion: false,
      progress_notes: ""
    }
  });

  // Fetch belts data
  useEffect(() => {
    const fetchBelts = async () => {
      try {
        const response = await axios.get("/api/belts");
        setBelts(response.data);
      } catch (error) {
        console.error("Failed to load belts:", error);
        toast({
          title: "Error",
          description: "Failed to load belt information",
          variant: "destructive"
        });
      }
    };

    fetchBelts();
  }, [toast]);

  // Fetch student data if editing
  useEffect(() => {
    if (isNewStudent) {
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        const studentData = response.data;
        setStudent(studentData);

        // Set personal info values
        personalInfoForm.reset({
          first_name: studentData.first_name,
          last_name: studentData.last_name,
          email: studentData.email,
          phone: studentData.phone || "",
          date_of_birth: studentData.date_of_birth || "",
          address: studentData.address || "",
          status: studentData.status,
          age_group: studentData.age_group || ""
        });

        // Set emergency info values
        emergencyInfoForm.reset({
          emergency_contact: studentData.emergency_contact || "",
          emergency_phone: studentData.emergency_phone || "",
          medical_notes: studentData.medical_notes || ""
        });

        // Set belt progress values if available
        if (
          studentData.student_progress &&
          studentData.student_progress.length > 0
        ) {
          const progress = studentData.student_progress[0];
          beltProgressForm.reset({
            belt_id: progress.current_belt_id,
            next_belt_id: progress.next_belt_id,
            next_grading_date: progress.next_grading_date || "",
            last_grading_date: progress.last_grading_date || "",
            eligible_for_promotion: progress.eligible_for_promotion,
            progress_notes: progress.notes || ""
          });
        }
      } catch (error) {
        console.error("Failed to load student:", error);
        toast({
          title: "Error",
          description: "Failed to load student data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [
    studentId,
    isNewStudent,
    personalInfoForm,
    emergencyInfoForm,
    beltProgressForm,
    toast
  ]);

  // Get the next belt based on current selection
  const getNextBeltId = (currentBeltId: number) => {
    const currentBelt = belts.find((b) => b.id === currentBeltId);
    if (!currentBelt) return undefined;

    const nextBelt = belts.find((b) => b.rank === currentBelt.rank + 1);
    return nextBelt?.id;
  };

  // Handle form submission
  const onSubmit = async () => {
    try {
      setSubmitting(true);

      // Validate all forms
      const personalValid = await personalInfoForm.trigger();
      const emergencyValid = await emergencyInfoForm.trigger();
      const beltValid = await beltProgressForm.trigger();

      if (!personalValid || !emergencyValid || !beltValid) {
        setActiveTab(
          !personalValid ? "personal" : !emergencyValid ? "emergency" : "belt"
        );
        toast({
          title: "Validation Error",
          description: "Please check all fields and try again.",
          variant: "destructive"
        });
        return;
      }

      // Combine all form data
      const formData = {
        ...personalInfoForm.getValues(),
        ...emergencyInfoForm.getValues(),
        ...beltProgressForm.getValues()
      };

      if (isNewStudent) {
        // Create new student
        const response = await axios.post("/api/students", formData);
        toast({
          title: "Success",
          description: "Student created successfully"
        });
        router.push(`/students/${response.data.id}`);
      } else {
        // Update existing student
        await axios.patch(`/api/students/${studentId}`, formData);
        toast({
          title: "Success",
          description: "Student updated successfully"
        });
        router.push(`/students/${studentId}`);
      }
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "Error",
        description: "Failed to save student data",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // Parse date string to Date object
  const parseDate = (dateString: string) => {
    if (!dateString) return undefined;
    try {
      return parse(dateString, "yyyy-MM-dd", new Date());
    } catch (error) {
      return undefined;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </Button>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-5 w-80" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href={isNewStudent ? "/students" : `/students/${studentId}`}>
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            {isNewStudent ? "Back to Students" : "Back to Student"}
          </Button>
        </Link>

        <Button onClick={onSubmit} disabled={submitting} className="gap-1">
          <Save className="h-4 w-4" />
          {submitting ? "Saving..." : "Save Student"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isNewStudent ? "Add New Student" : "Edit Student"}
          </CardTitle>
          <CardDescription>
            {isNewStudent
              ? "Enter the student's information to add them to the system"
              : "Update the student's information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              <TabsTrigger value="belt">Belt Progress</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Form {...personalInfoForm}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalInfoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalInfoForm.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(
                                      parseDate(field.value) || new Date(),
                                      "PPP"
                                    )
                                  : "Select date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={parseDate(field.value)}
                              onSelect={(date) =>
                                field.onChange(date ? formatDate(date) : "")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalInfoForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="trial">Trial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="age_group"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age Group</FormLabel>
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select age group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">Not specified</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="teen">Teen</SelectItem>
                              <SelectItem value="adult">Adult</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* Emergency Contact Tab */}
            <TabsContent value="emergency" className="space-y-4">
              <Form {...emergencyInfoForm}>
                <form className="space-y-4">
                  <FormField
                    control={emergencyInfoForm.control}
                    name="emergency_contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter emergency contact name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Name of the person to contact in case of emergency
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emergencyInfoForm.control}
                    name="emergency_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter emergency contact phone"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Phone number of the emergency contact
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emergencyInfoForm.control}
                    name="medical_notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any relevant medical information, allergies, or special needs"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Any medical conditions, allergies, or special needs
                          instructors should be aware of
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </TabsContent>

            {/* Belt Progress Tab */}
            <TabsContent value="belt" className="space-y-4">
              <Form {...beltProgressForm}>
                <form className="space-y-4">
                  <FormField
                    control={beltProgressForm.control}
                    name="belt_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Belt</FormLabel>
                        <Select
                          value={field.value?.toString() || ""}
                          onValueChange={(value) => {
                            const beltId = parseInt(value, 10);
                            field.onChange(beltId);

                            // Auto-set next belt when current belt changes
                            if (beltId) {
                              const nextBeltId = getNextBeltId(beltId);
                              beltProgressForm.setValue(
                                "next_belt_id",
                                nextBeltId
                              );
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select current belt" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Not assigned</SelectItem>
                            {belts.map((belt) => (
                              <SelectItem
                                key={belt.id}
                                value={belt.id.toString()}
                              >
                                {belt.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The student's current belt rank
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={beltProgressForm.control}
                    name="next_belt_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Next Belt</FormLabel>
                        <Select
                          value={field.value?.toString() || ""}
                          onValueChange={(value) =>
                            field.onChange(
                              value ? parseInt(value, 10) : undefined
                            )
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select next belt" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Not assigned</SelectItem>
                            {belts.map((belt) => (
                              <SelectItem
                                key={belt.id}
                                value={belt.id.toString()}
                              >
                                {belt.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The next belt the student is working toward
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={beltProgressForm.control}
                      name="last_grading_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Last Grading Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? format(
                                        parseDate(field.value) || new Date(),
                                        "PPP"
                                      )
                                    : "Select date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={parseDate(field.value)}
                                onSelect={(date) =>
                                  field.onChange(date ? formatDate(date) : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Date of last belt promotion
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={beltProgressForm.control}
                      name="next_grading_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Next Grading Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? format(
                                        parseDate(field.value) || new Date(),
                                        "PPP"
                                      )
                                    : "Select date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={parseDate(field.value)}
                                onSelect={(date) =>
                                  field.onChange(date ? formatDate(date) : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Planned date for next belt assessment
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={beltProgressForm.control}
                    name="eligible_for_promotion"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Eligible for Promotion</FormLabel>
                          <FormDescription>
                            Indicate if the student is ready for their next belt
                            promotion
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={beltProgressForm.control}
                    name="progress_notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progress Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter notes on the student's progress, skills, or areas for improvement"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Notes on the student's belt progress, skills mastery,
                          or areas for improvement
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
