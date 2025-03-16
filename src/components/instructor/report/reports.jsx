"use client"

import { useState } from "react"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { Download, Calendar, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for reports
const studentPerformanceData = [
    { name: "Assignment 1", average: 85, highest: 98, lowest: 65 },
    { name: "Assignment 2", average: 78, highest: 95, lowest: 60 },
    { name: "Assignment 3", average: 82, highest: 100, lowest: 68 },
    { name: "Midterm", average: 76, highest: 94, lowest: 55 },
    { name: "Assignment 4", average: 80, highest: 97, lowest: 62 },
    { name: "Assignment 5", average: 83, highest: 99, lowest: 70 },
    { name: "Final Exam", average: 79, highest: 96, lowest: 58 },
]

const attendanceData = [
    { week: "Week 1", attendance: 95 },
    { week: "Week 2", attendance: 92 },
    { week: "Week 3", attendance: 88 },
    { week: "Week 4", attendance: 90 },
    { week: "Week 5", attendance: 85 },
    { week: "Week 6", attendance: 82 },
    { week: "Week 7", attendance: 80 },
    { week: "Week 8", attendance: 78 },
    { week: "Week 9", attendance: 75 },
    { week: "Week 10", attendance: 72 },
]

const gradeDistributionData = [
    { name: "A", value: 35, color: "#4CAF50" },
    { name: "B", value: 25, color: "#2196F3" },
    { name: "C", value: 20, color: "#FFC107" },
    { name: "D", value: 15, color: "#FF9800" },
    { name: "F", value: 5, color: "#F44336" },
]

const courseEngagementData = [
    { name: "Lectures", attended: 85, watched: 10, missed: 5 },
    { name: "Assignments", completed: 90, late: 8, missed: 2 },
    { name: "Discussions", participated: 65, viewed: 25, none: 10 },
    { name: "Readings", completed: 70, partial: 20, none: 10 },
    { name: "Quizzes", completed: 95, missed: 5, none: 0 },
]

export default function ReportDashboard() {
    const [timeRange, setTimeRange] = useState("semester")
    const [courseFilter, setCourseFilter] = useState("all")
    const [lastUpdated] = useState(new Date())

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex items-center space-x-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Last Week</SelectItem>
                            <SelectItem value="month">Last Month</SelectItem>
                            <SelectItem value="semester">Current Semester</SelectItem>
                            <SelectItem value="year">Academic Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            <SelectItem value="CS101">CS101</SelectItem>
                            <SelectItem value="CS201">CS201</SelectItem>
                            <SelectItem value="CS301">CS301</SelectItem>
                            <SelectItem value="CS401">CS401</SelectItem>
                            <SelectItem value="CS501">CS501</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Reports
                    </Button>
                    <Button variant="ghost" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Last updated: {format(lastUpdated, "MMMM d, yyyy h:mm a")}</span>
            </div>

            <Tabs defaultValue="performance" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Performance</CardTitle>
                            <CardDescription>Average, highest, and lowest scores across assessments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={studentPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="average" fill="#8884d8" />
                                        <Bar dataKey="highest" fill="#82ca9d" />
                                        <Bar dataKey="lowest" fill="#ffc658" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="attendance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Trends</CardTitle>
                            <CardDescription>Weekly attendance rates across all courses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={attendanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="week" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="grades" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Grade Distribution</CardTitle>
                            <CardDescription>Distribution of grades across all courses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={gradeDistributionData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {gradeDistributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Engagement</CardTitle>
                            <CardDescription>Student engagement with different course activities and materials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={courseEngagementData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="completed" stackId="a" fill="#8884d8" />
                                        <Bar dataKey="attended" stackId="a" fill="#8884d8" />
                                        <Bar dataKey="participated" stackId="a" fill="#8884d8" />
                                        <Bar dataKey="late" stackId="a" fill="#82ca9d" />
                                        <Bar dataKey="partial" stackId="a" fill="#82ca9d" />
                                        <Bar dataKey="watched" stackId="a" fill="#82ca9d" />
                                        <Bar dataKey="viewed" stackId="a" fill="#82ca9d" />
                                        <Bar dataKey="missed" stackId="a" fill="#ffc658" />
                                        <Bar dataKey="none" stackId="a" fill="#ffc658" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

