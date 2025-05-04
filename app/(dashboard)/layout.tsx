"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  CreditCard,
  Award,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard"
    },
    {
      name: "Students",
      href: "/students",
      icon: Users,
      current: pathname.includes("/students")
    },
    {
      name: "Classes",
      href: "/classes",
      icon: Calendar,
      current: pathname.includes("/classes")
    },
    {
      name: "Attendance",
      href: "/attendance",
      icon: ClipboardCheck,
      current: pathname.includes("/attendance")
    },
    {
      name: "Payments",
      href: "/payments",
      icon: CreditCard,
      current: pathname.includes("/payments")
    },
    {
      name: "Belt Progress",
      href: "/belt-progress",
      icon: Award,
      current: pathname.includes("/belt-progress")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-30 flex items-center justify-between p-4 border-b">
        <Link href="/dashboard" className="font-bold text-xl">
          GG Taekwondo
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed top-0 left-0 h-full w-64 bg-white border-r transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/dashboard" className="font-bold text-xl">
              GG Taekwondo
            </Link>
          </div>
          <nav className="flex-1 py-4 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? "text-blue-500" : "text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t flex items-center">
            <UserButton afterSignOutUrl="/" />
            <div className="ml-3">
              <p className="text-sm font-medium">Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <main
        className={`lg:pl-64 pt-4 lg:pt-0 flex-1 min-h-screen ${sidebarOpen ? "blur-sm" : ""} lg:blur-none`}
      >
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
