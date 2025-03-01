"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  GraduationCap,
  BookMarked,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import { CourseEnrollmentChart } from "./course-enrollment-chart";
import { SubjectDistributionChart } from "./subject-distribution-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CourseTable } from "./course-table";

// Mock data
const mockCourses = [
  {
    id: "1",
    name: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. John Smith",
    subject: "Computer Science",
    enrolledStudents: 150,
    maxCapacity: 200,
    startDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Advanced Mathematics",
    code: "MATH301",
    instructor: "Dr. Sarah Johnson",
    subject: "Mathematics",
    enrolledStudents: 75,
    maxCapacity: 100,
    startDate: "2024-01-20",
    status: "active",
  },
  {
    id: "3",
    name: "Digital Electronics",
    code: "EE201",
    instructor: "Prof. Michael Brown",
    subject: "Electronics",
    enrolledStudents: 90,
    maxCapacity: 120,
    startDate: "2024-02-01",
    status: "upcoming",
  },
  {
    id: "4",
    name: "Organic Chemistry",
    code: "CHEM202",
    instructor: "Dr. Emily White",
    subject: "Chemistry",
    enrolledStudents: 60,
    maxCapacity: 80,
    startDate: "2024-01-10",
    status: "active",
  },
  {
    id: "5",
    name: "Machine Learning Fundamentals",
    code: "CS401",
    instructor: "Prof. David Lee",
    subject: "Computer Science",
    enrolledStudents: 100,
    maxCapacity: 100,
    startDate: "2024-02-15",
    status: "upcoming",
  },
];

// Calculate statistics
const totalCourses = mockCourses.length;
const totalInstructors = new Set(mockCourses.map((course) => course.instructor))
  .size;
const totalSubjects = new Set(mockCourses.map((course) => course.subject)).size;
const totalEnrollments = mockCourses.reduce(
  (sum, course) => sum + course.enrolledStudents,
  0
);
const averageEnrollment = Math.round(totalEnrollments / totalCourses);
const activeCourses = mockCourses.filter(
  (course) => course.status === "active"
).length;
const upcomingCourses = mockCourses.filter(
  (course) => course.status === "upcoming"
).length;

export default function CourseManagementDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Course Management
            </h1>
            <p className="text-muted-foreground">
              Overview and management of all courses in the system
            </p>
          </div>
          <Button asChild>
            <Link href="/course-management/create">Create New Course</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  {activeCourses} active, {upcomingCourses} upcoming
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Instructors
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInstructors}</div>
                <p className="text-xs text-muted-foreground">
                  Across all departments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Subjects
                </CardTitle>
                <BookMarked className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSubjects}</div>
                <p className="text-xs text-muted-foreground">
                  Available for enrollment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Enrollments
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrollments}</div>
                <p className="text-xs text-muted-foreground">
                  ~{averageEnrollment} per course
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Courses
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCourses}</div>
                <p className="text-xs text-muted-foreground">
                  Currently in session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Courses
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingCourses}</div>
                <p className="text-xs text-muted-foreground">Starting soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Enrollment
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageEnrollment}</div>
                <p className="text-xs text-muted-foreground">
                  Students per course
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Course Enrollment Trends</CardTitle>
                <CardDescription>
                  Student enrollment distribution across courses
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CourseEnrollmentChart courses={mockCourses} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Courses by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <SubjectDistributionChart courses={mockCourses} />
              </CardContent>
            </Card>
          </div>

          {/* Recent Courses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>
                Latest courses added to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseTable courses={mockCourses} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Courses</CardTitle>
              <CardDescription>
                Comprehensive list of all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseTable courses={mockCourses} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown by subject area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubjectDistributionChart courses={mockCourses} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
