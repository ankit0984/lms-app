"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, Calendar, MessageSquare, Plus, FileText } from "lucide-react"
import { InstructorCourseList } from "@/components/instructor/dashboard/instructor-course-list"
import { InstructorSchedule } from "@/components/instructor/dashboard/schedule"
import { StudentPerformanceChart } from "@/components/instructor/dashboard/studentPerformanceChart"
import { CourseEngagementChart } from "@/components/instructor/dashboard/couresEngagementChart"
import { RecentActivities } from "@/components/instructor/dashboard/recentActivites"
import { PendingAssignments } from "@/components/instructor/assignments/pendingAssignment"

// Mock instructor data
const instructorData = {
    name: "Dr. John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Computer Science",
    email: "john.smith@university.edu",
    joinedDate: "2020-05-15",
    totalCourses: 5,
    activeCourses: 3,
    totalStudents: 187,
    upcomingSessions: 8,
    pendingAssignments: 12,
    unreadMessages: 5,
}

// Mock courses data
const mockCourses = [
    {
        id: "1",
        code: "CS101",
        title: "Introduction to Computer Science",
        students: 45,
        progress: 65,
        nextSession: "Monday, 10:00 AM",
        status: "active",
    },
    {
        id: "2",
        code: "CS201",
        title: "Data Structures and Algorithms",
        students: 38,
        progress: 42,
        nextSession: "Tuesday, 2:00 PM",
        status: "active",
    },
    {
        id: "3",
        code: "CS301",
        title: "Database Systems",
        students: 32,
        progress: 78,
        nextSession: "Wednesday, 11:30 AM",
        status: "active",
    },
    {
        id: "4",
        code: "CS401",
        title: "Artificial Intelligence",
        students: 28,
        progress: 0,
        nextSession: "Starts next semester",
        status: "upcoming",
    },
    {
        id: "5",
        code: "CS150",
        title: "Web Development Fundamentals",
        students: 44,
        progress: 100,
        nextSession: "Completed",
        status: "completed",
    },
]

export default function InstructorDashboard() {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState("overview")

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={instructorData.avatar} alt={instructorData.name} />
                            <AvatarFallback>
                                {instructorData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{instructorData.name}</h1>
                            <p className="text-muted-foreground">{instructorData.department} • Instructor</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.push("/instructor/messages")}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Messages
                            {instructorData.unreadMessages > 0 && (
                                <Badge variant="destructive" className="ml-2">
                                    {instructorData.unreadMessages}
                                </Badge>
                            )}
                        </Button>
                        <Button onClick={() => router.push("/courses/new")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Course
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setSelectedTab}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="courses">My Courses</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    {/* Key Statistics Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{instructorData.activeCourses}</div>
                                <p className="text-xs text-muted-foreground">of {instructorData.totalCourses} total courses</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{instructorData.totalStudents}</div>
                                <p className="text-xs text-muted-foreground">Across all courses</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{instructorData.upcomingSessions}</div>
                                <p className="text-xs text-muted-foreground">In the next 7 days</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{instructorData.pendingAssignments}</div>
                                <p className="text-xs text-muted-foreground">Awaiting review</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Course Progress and Schedule */}
                    <div className="grid gap-4 md:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Course Engagement</CardTitle>
                                <CardDescription>Student participation across your active courses</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <CourseEngagementChart />
                            </CardContent>
                        </Card>

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Upcoming Schedule</CardTitle>
                                <CardDescription>Your next teaching sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InstructorSchedule compact={true} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activities and Pending Tasks */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                                <CardDescription>Latest updates from your courses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentActivities />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Assignments</CardTitle>
                                <CardDescription>Assignments awaiting your review</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PendingAssignments />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Active Courses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Courses</CardTitle>
                            <CardDescription>Courses you are currently teaching</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <InstructorCourseList courses={mockCourses.filter((course) => course.status === "active")} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>My Courses</CardTitle>
                                <CardDescription>All courses you are teaching or have taught</CardDescription>
                            </div>
                            <Button onClick={() => router.push("/courses/new")}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Course
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="active">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="active">Active</TabsTrigger>
                                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                    <TabsTrigger value="completed">Completed</TabsTrigger>
                                    <TabsTrigger value="all">All Courses</TabsTrigger>
                                </TabsList>
                                <TabsContent value="active">
                                    <InstructorCourseList courses={mockCourses.filter((course) => course.status === "active")} />
                                </TabsContent>
                                <TabsContent value="upcoming">
                                    <InstructorCourseList courses={mockCourses.filter((course) => course.status === "upcoming")} />
                                </TabsContent>
                                <TabsContent value="completed">
                                    <InstructorCourseList courses={mockCourses.filter((course) => course.status === "completed")} />
                                </TabsContent>
                                <TabsContent value="all">
                                    <InstructorCourseList courses={mockCourses} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Teaching Schedule</CardTitle>
                            <CardDescription>Your upcoming classes and office hours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <InstructorSchedule compact={false} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Performance</CardTitle>
                            <CardDescription>Overview of student grades and participation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <StudentPerformanceChart />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Student Engagement by Course</CardTitle>
                            <CardDescription>Participation metrics across your courses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockCourses
                                    .filter((course) => course.status === "active")
                                    .map((course) => (
                                        <div key={course.id} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">{course.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {course.code} • {course.students} students
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.push(`/courses/${course.id}/students`)}
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Engagement Rate</span>
                                                    <span className="font-medium">{Math.floor(Math.random() * 30) + 70}%</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-secondary">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Assignment Completion</span>
                                                    <span className="font-medium">{Math.floor(Math.random() * 20) + 80}%</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-secondary">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

