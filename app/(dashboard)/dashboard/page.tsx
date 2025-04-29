import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { getSupabaseUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  DollarSign,
  Award
} from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get the user from Supabase
  const user = await getSupabaseUser();

  // Get current belt information if available
  let currentBelt = "Not set";
  if (user) {
    const { data: progressData } = await supabase
      .from("student_progress")
      .select("*, belt:current_belt_id(name)")
      .eq("user_id", user.id)
      .single();

    if (progressData?.belt?.name) {
      currentBelt = progressData.belt.name;
    }
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-2xl font-bold">GG Taekwondo Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Welcome, {user?.first_name || "Taekwondo Student"}
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="py-8">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Current Belt</h3>
            <p className="text-2xl font-bold mt-2">{currentBelt}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Next Class</h3>
            <p className="text-2xl font-bold mt-2">Today at 5:00 PM</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Membership Status</h3>
            <p className="text-2xl font-bold mt-2">
              {user?.status || "Active"}
            </p>
          </div>
        </div>
      </main>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Memberships
            </CardTitle>
            <UserCheck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Classes This Week
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱256,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Belt Promotions
            </CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Most recent changes and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">New Student Registration</div>
                  <div className="text-xs text-gray-500">3 minutes ago</div>
                </div>
                <p className="text-sm text-gray-600">
                  Maria Santos joined as a new student
                </p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Payment Received</div>
                  <div className="text-xs text-gray-500">1 hour ago</div>
                </div>
                <p className="text-sm text-gray-600">
                  Miguel Rivera submitted payment for April
                </p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Belt Promotion</div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
                <p className="text-sm text-gray-600">
                  8 students promoted to next belt rank
                </p>
              </div>
              <div className="pb-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Class Attendance Record</div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
                <p className="text-sm text-gray-600">
                  Children&apos;s class had 95% attendance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Scheduled classes and special events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Belt Test Preparation</div>
                  <div className="text-xs text-gray-500">Today, 5:00 PM</div>
                </div>
                <p className="text-sm text-gray-600">
                  Special class for students testing this month
                </p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Parents Meeting</div>
                  <div className="text-xs text-gray-500">Tomorrow, 7:00 PM</div>
                </div>
                <p className="text-sm text-gray-600">
                  Discussion about upcoming tournament
                </p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Belt Promotion Ceremony</div>
                  <div className="text-xs text-gray-500">
                    Saturday, 10:00 AM
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Formal ceremony for all promoted students
                </p>
              </div>
              <div className="pb-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">Community Demonstration</div>
                  <div className="text-xs text-gray-500">Next Sunday</div>
                </div>
                <p className="text-sm text-gray-600">
                  Public demonstration at City Park
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
