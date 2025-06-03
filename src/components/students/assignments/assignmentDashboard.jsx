// components/students/assignments/assignmentDashboard.jsx
'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCheck, ClipboardList, FileClock, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StudentAssignmentCharts from "@/components/students/assignments/assignmentCharts";

// Sample student assignment data organized by semester
const studentAssignmentData = [
    {
        semester: 1,
        total_assignment: 4,
        submitted_assignment: 3,
        due_assignment: 1,
        assignments: [
            {
                title: "Introduction to Programming",
                subjectCode: "CS201",
                description: "Write a program to manage a student record system in C.",
                dueDate: "2025-06-04",
                submissionDate: "2025-06-03",
                status: "submitted",
                grade: "A"
            },
            {
                title: "Mathematics Assignment",
                subjectCode: "MA201",
                description: "Solve problems on probability and statistics.",
                dueDate: "2025-06-02",
                submissionDate: "2025-06-01",
                status: "submitted",
                grade: "B"
            },
            {
                title: "Digital Logic Design",
                subjectCode: "EC201",
                description: "Design combinational circuits using K-maps.",
                dueDate: "2025-06-06",
                submissionDate: "2025-06-05",
                status: "submitted",
                grade: "A-"
            },
            {
                title: "Environmental Science",
                subjectCode: "EVS201",
                description: "Write a report on sustainable energy practices.",
                dueDate: "2025-06-09",
                submissionDate: null,
                status: "pending",
                grade: null
            }
        ]
    },
    {
        semester: 4,
        total_assignment: 5,
        submitted_assignment: 4,
        due_assignment: 1,
        assignments: [
            {
                title: "Database Design",
                subjectCode: "CS401",
                description: "Design an ER diagram for a university database.",
                dueDate: "2025-06-05",
                submissionDate: "2025-06-04",
                status: "submitted",
                grade: "A"
            },
            {
                title: "Computer Networks Assignment",
                subjectCode: "CS402",
                description: "Explain TCP/IP model with real-world examples.",
                dueDate: "2025-06-08",
                submissionDate: "2025-06-07",
                status: "submitted",
                grade: "B+"
            },
            {
                title: "Operating Systems Project",
                subjectCode: "CS403",
                description: "Simulate CPU scheduling algorithms in C++.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                status: "submitted",
                grade: "A-"
            },
            {
                title: "Software Engineering",
                subjectCode: "CS404",
                description: "Prepare a software requirements specification document.",
                dueDate: "2025-06-15",
                submissionDate: "2025-06-14",
                status: "submitted",
                grade: "B"
            },
            {
                title: "Java Lab Assignment",
                subjectCode: "CS405",
                description: "Build a small Java GUI application using Swing.",
                dueDate: "2025-06-20",
                submissionDate: null,
                status: "pending",
                grade: null
            }
        ]
    },
    {
        semester: 6,
        total_assignment: 5,
        submitted_assignment: 5,
        due_assignment: 0,
        assignments: [
            {
                title: "Machine Learning Assignment 1",
                subjectCode: "DS601",
                description: "Implement linear regression using Python and sklearn.",
                dueDate: "2025-06-10",
                submissionDate: "2025-06-09",
                status: "submitted",
                grade: "A+"
            },
            {
                title: "Data Visualization Project",
                subjectCode: "DS602",
                description: "Create an interactive dashboard using Plotly.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                status: "submitted",
                grade: "A"
            },
            {
                title: "Deep Learning Basics",
                subjectCode: "DS603",
                description: "Explain CNN architectures with examples.",
                dueDate: "2025-06-14",
                submissionDate: "2025-06-13",
                status: "submitted",
                grade: "B+"
            },
            {
                title: "Big Data Analytics",
                subjectCode: "DS604",
                description: "Use Apache Spark to process a dataset.",
                dueDate: "2025-06-16",
                submissionDate: "2025-06-15",
                status: "submitted",
                grade: "A-"
            },
            {
                title: "NLP Task",
                subjectCode: "DS605",
                description: "Perform sentiment analysis on Twitter data.",
                dueDate: "2025-06-18",
                submissionDate: "2025-06-17",
                status: "submitted",
                grade: "B+"
            }
        ]
    }
];

const StudentAssignmentDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedSemester, setSelectedSemester] = useState("all");

    // Get unique semesters for the dropdown
    const uniqueSemesters = [...new Set(studentAssignmentData.map(d => d.semester.toString()))];

    // Filter data based on selected semester
    const filteredData = useMemo(() => {
        if (selectedSemester === "all") {
            return studentAssignmentData;
        }
        return studentAssignmentData.filter(d => d.semester.toString() === selectedSemester);
    }, [selectedSemester]);

    // Calculate totals from filtered data
    const totalAssignments = useMemo(() => {
        return filteredData.reduce((acc, d) => acc + d.total_assignment, 0);
    }, [filteredData]);

    const totalSubmitted = useMemo(() => {
        return filteredData.reduce((acc, d) => acc + d.submitted_assignment, 0);
    }, [filteredData]);

    const totalPending = useMemo(() => {
        return filteredData.reduce((acc, d) => acc + d.due_assignment, 0);
    }, [filteredData]);

    // Get all assignments from filtered data
    const allAssignments = useMemo(() => {
        return filteredData.flatMap(d => d.assignments);
    }, [filteredData]);

    // Calculate upcoming deadlines
    const now = new Date();
    const upcomingDeadlines = useMemo(() => {
        return allAssignments
            .filter(assignment => assignment.status === "pending")
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map(assignment => ({
                ...assignment,
                daysLeft: Math.ceil((new Date(assignment.dueDate) - now) / (1000 * 60 * 60 * 24))
            }));
    }, [allAssignments]);

    // Calculate average grade
    const averageGrade = useMemo(() => {
        const gradePoints = {
            "A+": 4.0,
            "A": 4.0,
            "A-": 3.7,
            "B+": 3.3,
            "B": 3.0,
            "B-": 2.7,
            "C+": 2.3,
            "C": 2.0,
            "F": 0.0
        };

        const gradedAssignments = allAssignments.filter(a => a.grade);
        if (gradedAssignments.length === 0) return "N/A";

        const totalPoints = gradedAssignments.reduce((sum, a) => sum + (gradePoints[a.grade] || 0), 0);
        return (totalPoints / gradedAssignments.length).toFixed(2);
    }, [allAssignments]);

    return (
        <div className="flex flex-col space-y-6">
            {/* Header with Semester Selector */}
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-2xl font-bold">Assignment Dashboard</h2>
                <div className="flex gap-2">
                    {/* Semester Selector */}
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Semesters" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Semester</SelectLabel>
                                <SelectItem value="all">All Semesters</SelectItem>
                                {uniqueSemesters.map((sem) => (
                                    <SelectItem key={sem} value={sem}>
                                        Semester {sem}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Assignments */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Assignments
                        </CardTitle>
                        <ClipboardList className="w-5 h-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAssignments}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">All your assigned tasks</CardFooter>
                </Card>

                {/* Submitted */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Submitted
                        </CardTitle>
                        <BookCheck className="w-5 h-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSubmitted}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">Completed assignments</CardFooter>
                </Card>

                {/* Pending */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                        <FileClock className="w-5 h-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPending}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">Tasks to complete</CardFooter>
                </Card>

                {/* Average Grade */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Average Grade
                        </CardTitle>
                        <Calendar className="w-5 h-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{averageGrade}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">GPA for all assignments</CardFooter>
                </Card>
            </div>

            {/* Upcoming Deadlines */}
            {upcomingDeadlines.length > 0 && (
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {upcomingDeadlines.map((assignment, idx) => (
                                <Card key={idx} className={`border-l-4 ${assignment.daysLeft <= 3 ? 'border-l-red-500' : 'border-l-yellow-500'}`}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{assignment.title}</h3>
                                                <p className="text-sm text-muted-foreground">{assignment.subjectCode}</p>
                                                <p className="text-sm mt-2">{assignment.description}</p>
                                            </div>
                                            <Badge variant={assignment.daysLeft <= 3 ? "destructive" : "outline"}>
                                                {assignment.daysLeft} {assignment.daysLeft === 1 ? 'day' : 'days'} left
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tabs for different views */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="all">All Assignments</TabsTrigger>
                    <TabsTrigger value="graded">Graded Assignments</TabsTrigger>
                </TabsList>

                {/* Overview Tab - Charts */}
                <TabsContent value="overview" className="mt-6">
                    <StudentAssignmentCharts 
                        assignments={allAssignments} 
                        totalSubmitted={totalSubmitted} 
                        totalPending={totalPending} 
                    />
                </TabsContent>

                {/* All Assignments Tab - Table */}
                <TabsContent value="all" className="mt-6">
                    <Card>
                        <CardContent className="overflow-x-auto p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Subject Code</TableHead>
                                        <TableHead>Assignment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Submission Date</TableHead>
                                        <TableHead>Grade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allAssignments.map((assignment, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{assignment.subjectCode}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{assignment.title}</div>
                                                    <div className="text-sm text-muted-foreground">{assignment.description}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={assignment.status === 'submitted' ? 'success' : 'outline'} className={`capitalize ${assignment.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {assignment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{assignment.dueDate}</TableCell>
                                            <TableCell>{assignment.submissionDate ?? '—'}</TableCell>
                                            <TableCell>{assignment.grade ?? '—'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Graded Assignments Tab */}
                <TabsContent value="graded" className="mt-6">
                    <Card>
                        <CardContent className="overflow-x-auto p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Subject Code</TableHead>
                                        <TableHead>Assignment</TableHead>
                                        <TableHead>Submission Date</TableHead>
                                        <TableHead>Grade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allAssignments
                                        .filter(assignment => assignment.grade)
                                        .map((assignment, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{assignment.subjectCode}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{assignment.title}</div>
                                                        <div className="text-sm text-muted-foreground">{assignment.description}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{assignment.submissionDate}</TableCell>
                                                <TableCell>
                                                    <Badge className={`
                                                        ${assignment.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                                                          assignment.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                                                          'bg-yellow-100 text-yellow-800'}
                                                    `}>
                                                        {assignment.grade}
                                                    </Badge>
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
};

export default StudentAssignmentDashboard;
