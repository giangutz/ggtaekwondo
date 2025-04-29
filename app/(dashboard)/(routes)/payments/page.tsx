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
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Search,
  Check,
  X,
  Clock,
  AlertTriangle,
  CreditCard,
  FileText,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function PaymentsPage() {
  // This would come from a database in a real implementation
  const pendingPayments = [
    {
      id: "p1",
      studentName: "Sofia Garcia",
      amount: "₱3,000.00",
      type: "Tuition",
      paymentMethod: "GCash",
      submittedDate: "Apr 28, 2023",
      submittedBy: "Parent: Maria Garcia",
      status: "pending",
      hasReceipt: true
    },
    {
      id: "p2",
      studentName: "Jamal Clark",
      amount: "₱350.00",
      type: "Per Session",
      paymentMethod: "Cash",
      submittedDate: "Apr 29, 2023",
      submittedBy: "Instructor: Master Lee",
      status: "pending",
      hasReceipt: false
    },
    {
      id: "p3",
      studentName: "Emma Thompson",
      amount: "₱4,500.00",
      type: "Tuition",
      paymentMethod: "Bank Transfer",
      submittedDate: "Apr 29, 2023",
      submittedBy: "Parent: James Thompson",
      status: "pending",
      hasReceipt: true
    }
  ];

  const recentPayments = [
    {
      id: "r1",
      studentName: "Alex Johnson",
      amount: "₱3,000.00",
      type: "Tuition",
      paymentMethod: "GCash",
      date: "Apr 15, 2023",
      status: "completed"
    },
    {
      id: "r2",
      studentName: "Marcus Wong",
      amount: "₱4,500.00",
      type: "Tuition",
      paymentMethod: "Bank Transfer",
      date: "Apr 10, 2023",
      status: "completed"
    },
    {
      id: "r3",
      studentName: "Sofia Garcia",
      amount: "₱500.00",
      type: "Belt Test",
      paymentMethod: "Cash",
      date: "Apr 5, 2023",
      status: "completed"
    },
    {
      id: "r4",
      studentName: "Liam Patel",
      amount: "₱3,000.00",
      type: "Tuition",
      paymentMethod: "Bank Transfer",
      date: "Apr 3, 2023",
      status: "failed"
    },
    {
      id: "r5",
      studentName: "Emma Thompson",
      amount: "₱350.00",
      type: "Per Session",
      paymentMethod: "Cash",
      date: "Apr 1, 2023",
      status: "completed"
    }
  ];

  const upcomingPayments = [
    {
      id: "u1",
      studentName: "Alex Johnson",
      amount: "₱3,000.00",
      type: "Tuition",
      dueDate: "May 15, 2023",
      status: "upcoming",
      daysUntilDue: 14
    },
    {
      id: "u2",
      studentName: "Marcus Wong",
      amount: "₱4,500.00",
      type: "Tuition",
      dueDate: "May 10, 2023",
      status: "upcoming",
      daysUntilDue: 9
    },
    {
      id: "u3",
      studentName: "Sofia Garcia",
      amount: "₱3,000.00",
      type: "Tuition",
      dueDate: "May 3, 2023",
      status: "upcoming",
      daysUntilDue: 2
    },
    {
      id: "u4",
      studentName: "Emma Thompson",
      amount: "₱4,500.00",
      type: "Tuition",
      dueDate: "Apr 30, 2023",
      status: "overdue",
      daysUntilDue: -1
    },
    {
      id: "u5",
      studentName: "Jamal Clark",
      amount: "₱3,000.00",
      type: "Tuition",
      dueDate: "Apr 27, 2023",
      status: "overdue",
      daysUntilDue: -4
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="flex gap-2">
          <Link href="/payments/record">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </Link>
          <Link href="/payments/send-reminders">
            <Button variant="outline">Send Reminders</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="pending" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            <Clock className="mr-2 h-4 w-4" />
            Pending Verification
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Check className="mr-2 h-4 w-4" />
            Recent Payments
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Upcoming/Overdue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verification</CardTitle>
              <CardDescription>
                Review and verify submitted payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingPayments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending payments to verify
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {payment.studentName}
                        </TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>
                          <div className="text-sm">{payment.submittedDate}</div>
                          <div className="text-xs text-gray-500">
                            {payment.submittedBy}
                          </div>
                        </TableCell>
                        <TableCell>
                          {payment.hasReceipt ? (
                            <Link
                              href={`/payments/receipt/${payment.id}`}
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          ) : (
                            <span className="text-gray-500 text-sm">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Verify
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                            >
                              <X className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                View recently processed payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by student name"
                    className="pl-8"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tuition">Tuition</SelectItem>
                    <SelectItem value="belt_test">Belt Test</SelectItem>
                    <SelectItem value="per_session">Per Session</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="gcash">GCash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.studentName}
                      </TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status === "completed" ? (
                            <Check className="mr-1 h-3 w-3" />
                          ) : (
                            <X className="mr-1 h-3 w-3" />
                          )}
                          {payment.status === "completed"
                            ? "Completed"
                            : "Failed"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/payments/${payment.id}`}>
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
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming and Overdue Payments</CardTitle>
              <CardDescription>
                Track payments that are due soon or already overdue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.studentName}
                      </TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : payment.daysUntilDue <= 3
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {payment.status === "overdue" ? (
                            <>
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {Math.abs(payment.daysUntilDue)} days overdue
                            </>
                          ) : (
                            <>
                              <Clock className="mr-1 h-3 w-3" />
                              Due in {payment.daysUntilDue} days
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/payments/record?student=${payment.id}`}>
                            <Button size="sm">
                              <CreditCard className="mr-1 h-4 w-4" />
                              Record
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            Remind
                          </Button>
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
