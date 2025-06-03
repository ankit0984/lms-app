"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  GraduationCap,
  UserCog,
  ShieldCheck,
  BookOpen,
  BarChart3,
  Activity,
} from "lucide-react";
import { RecentUsersTable } from "@/components/support/recent-users-table";
import { UserActivityChart } from "@/components/support/user-activity-chart";
import { RoleDistributionChart } from "@/components/support/role-distribution-chart";

// Mock data - in a real app, this would come from an API
const mockUsers = [
  {
    id: "1",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "student",
    suspended: false,
    lastLogin: "2023-12-01T10:30:00Z",
    coursesEnrolled: 3,
    createdAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "2",
    username: "janedoe",
    email: "jane.doe@example.com",
    role: "instructor",
    suspended: false,
    lastLogin: "2023-12-05T14:20:00Z",
    coursesEnrolled: 0,
    createdAt: "2023-02-10T09:15:00Z",
  },
  {
    id: "3",
    username: "adminuser",
    email: "admin@example.com",
    role: "admin",
    suspended: false,
    lastLogin: "2023-12-07T11:45:00Z",
    coursesEnrolled: 0,
    createdAt: "2022-11-05T10:00:00Z",
  },
  {
    id: "4",
    username: "suspendeduser",
    email: "suspended@example.com",
    role: "student",
    suspended: true,
    lastLogin: "2023-11-20T16:30:00Z",
    coursesEnrolled: 2,
    createdAt: "2023-03-20T11:30:00Z",
  },
  {
    id: "5",
    username: "teacherjones",
    email: "jones@example.com",
    role: "instructor",
    suspended: false,
    lastLogin: "2023-12-06T09:10:00Z",
    coursesEnrolled: 0,
    createdAt: "2023-01-25T13:45:00Z",
  },
  {
    id: "6",
    username: "newstudent",
    email: "newstudent@example.com",
    role: "student",
    suspended: false,
    lastLogin: null,
    coursesEnrolled: 1,
    createdAt: "2023-12-01T15:20:00Z",
  },
  {
    id: "7",
    username: "student123",
    email: "student123@example.com",
    role: "student",
    suspended: false,
    lastLogin: "2023-12-02T08:15:00Z",
    coursesEnrolled: 4,
    createdAt: "2023-04-10T09:30:00Z",
  },
  {
    id: "8",
    username: "instructor456",
    email: "instructor456@example.com",
    role: "instructor",
    suspended: false,
    lastLogin: "2023-12-04T11:20:00Z",
    coursesEnrolled: 0,
    createdAt: "2023-03-15T14:45:00Z",
  },
  {
    id: "9",
    username: "admin789",
    email: "admin789@example.com",
    role: "admin",
    suspended: false,
    lastLogin: "2023-12-03T16:40:00Z",
    coursesEnrolled: 0,
    createdAt: "2023-01-05T10:15:00Z",
  },
  {
    id: "10",
    username: "suspended123",
    email: "suspended123@example.com",
    role: "student",
    suspended: true,
    lastLogin: "2023-11-15T09:30:00Z",
    coursesEnrolled: 2,
    createdAt: "2023-02-20T13:10:00Z",
  },
];

// Mock course data
const mockCourses = [
  { id: "1", title: "Introduction to Programming", enrollments: 45 },
  { id: "2", title: "Advanced Mathematics", enrollments: 32 },
  { id: "3", title: "Digital Marketing Fundamentals", enrollments: 58 },
  { id: "4", title: "Data Science Basics", enrollments: 67 },
  { id: "5", title: "Graphic Design Principles", enrollments: 41 },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate statistics
  const totalUsers = mockUsers.length;
  const totalStudents = mockUsers.filter(
    (user) => user.role === "student"
  ).length;
  const totalInstructors = mockUsers.filter(
    (user) => user.role === "instructor"
  ).length;
  const totalAdmins = mockUsers.filter((user) => user.role === "admin").length;
  const activeUsers = mockUsers.filter((user) => !user.suspended).length;
  const suspendedUsers = mockUsers.filter((user) => user.suspended).length;

  // Calculate total subjects and enrollments
  const totalCourses = mockCourses.length;
  const totalEnrollments = mockCourses.reduce(
    (sum, course) => sum + course.enrollments,
    0
  );

  // Get recent users (last 5 registered)
  const recentUsers = [...mockUsers]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Learning Management System
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* User Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  {((totalStudents / totalUsers) * 100).toFixed(1)}% of users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Instructors
                </CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInstructors}</div>
                <p className="text-xs text-muted-foreground">
                  {((totalInstructors / totalUsers) * 100).toFixed(1)}% of users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Admins
                </CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAdmins}</div>
                <p className="text-xs text-muted-foreground">
                  {((totalAdmins / totalUsers) * 100).toFixed(1)}% of users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeUsers} active, {suspendedUsers} suspended
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Course Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCourses}</div>
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Enrollments
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrollments}</div>
                <p className="text-xs text-muted-foreground">
                  {(totalEnrollments / totalStudents).toFixed(1)} per student
                  average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {((activeUsers / totalUsers) * 100).toFixed(1)}% of total
                  users
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Recent Users */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  User registrations and logins over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <UserActivityChart />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown by user role</CardDescription>
              </CardHeader>
              <CardContent>
                <RoleDistributionChart
                  students={totalStudents}
                  instructors={totalInstructors}
                  admins={totalAdmins}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Recently registered users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUsersTable users={recentUsers} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>
                In-depth analysis of your LMS data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section would contain more detailed analytics and reports.
                You can expand this with additional charts, tables, and metrics
                specific to your LMS needs.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
