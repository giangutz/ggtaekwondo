// import SideNav from "@/components/ui/SideNav";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Package2,
//   Home,
//   ShoppingCart,
//   Package,
//   Users2,
//   LineChart,
//   Settings,
// } from "lucide-react";
// import Link from "next/link";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookIcon,
  ClipboardIcon,
  SettingsIcon,
  TimerIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4 border-r bg-gray-100/40 p-4 dark:bg-gray-800/40">
          <div className="flex h-[60px] items-center">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <TimerIcon className="h-6 w-6" />
              <span>Taekwondo Academy</span>
            </Link>
          </div>
          <nav className="grid gap-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <BookIcon className="h-4 w-4" />
              <span>Courses</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <VideoIcon className="h-4 w-4" />
              <span>Lessons</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <ClipboardIcon className="h-4 w-4" />
              <span>Progress</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex-1 p-6">
            <div className="grid grid-cols-[2fr_1fr] gap-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Taekwondo Basics</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Lesson 1: Stances and Blocks
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Mark as Completed
                  </Button>
                </div>
                <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="h-full w-full rounded-lg object-cover" />
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Instructions</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      1. Stand with your feet shoulder-width apart, knees
                      slightly bent.
                      <br />
                      2. Raise your hands to chest level, palms facing outward.
                      <br />
                      3. Slowly extend your arms, keeping your elbows close to
                      your body.
                      <br />
                      4. Repeat the block 10 times, focusing on proper form and
                      technique.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      Interactive Exercise
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Practice the basic block by following the on-screen
                      instructions.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Start Exercise
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <h2 className="text-2xl font-bold">Progress</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Completed Lessons</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 dark:text-gray-400">
                        3 out of 12 lessons completed
                      </p>
                      <Progress value={25} className="w-32" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Upcoming Lessons</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <div className="text-gray-500 dark:text-gray-400">
                          Lesson 4: Kicking Techniques
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1"
                        >
                          Next
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="text-gray-500 dark:text-gray-400">
                          Lesson 5: Sparring Basics
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1"
                        >
                          Upcoming
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="text-gray-500 dark:text-gray-400">
                          Lesson 6: Forms and Patterns
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1"
                        >
                          Upcoming
                        </Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
