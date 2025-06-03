// components/students/assignments/submittedAssignments.jsx
'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCheck, Calendar, Award } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Using the same sample data as activeAssignments.jsx
const studentAssignmentData = [
    {
        semester: 1,
        total_assignment: 4,
        submitted_assignment: 3,
        due_assignment: 1,
        assignments: [
            {
                id: "cs201-intro-prog",
                title: "Introduction to Programming",
                subjectCode: "CS201",
                description: "Write a program to manage a student record system in C.",
                dueDate: "2025-06-04",
                submissionDate: "2025-06-03",
                status: "submitted",
                grade: "A"
            },
            {
                id: "ma201-math",
                title: "Mathematics Assignment",
                subjectCode: "MA201",
                description: "Solve problems on probability and statistics.",
                dueDate: "2025-06-02",
                submissionDate: "2025-06-01",
                status: "submitted",
                grade: "B"
            },
            {
                id: "ec201-logic",
                title: "Digital Logic Design",
                subjectCode: "EC201",
                description: "Design combinational circuits using K-maps.",
                dueDate: "2025-06-06",
                submissionDate: "2025-06-05",
                status: "submitted",
                grade: "A-"
            },
            {
                id: "evs201-env",
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
                id: "cs401-db",
                title: "Database Design",
                subjectCode: "CS401",
                description: "Design an ER diagram for a university database.",
                dueDate: "2025-06-05",
                submissionDate: "2025-06-04",
                status: "submitted",
                grade: "A"
            },
            {
                id: "cs402-networks",
                title: "Computer Networks Assignment",
                subjectCode: "CS402",
                description: "Explain TCP/IP model with real-world examples.",
                dueDate: "2025-06-08",
                submissionDate: "2025-06-07",
                status: "submitted",
                grade: "B+"
            },
            {
                id: "cs403-os",
                title: "Operating Systems Project",
                subjectCode: "CS403",
                description: "Simulate CPU scheduling algorithms in C++.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                status: "submitted",
                grade: "A-"
            },
            {
                id: "cs404-se",
                title: "Software Engineering",
                subjectCode: "CS404",
                description: "Prepare a software requirements specification document.",
                dueDate: "2025-06-15",
                submissionDate: "2025-06-14",
                status: "submitted",
                grade: "B"
            },
            {
                id: "cs405-java",
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
                id: "ds601-ml",
                title: "Machine Learning Assignment 1",
                subjectCode: "DS601",
                description: "Implement linear regression using Python and sklearn.",
                dueDate: "2025-06-10",
                submissionDate: "2025-06-09",
                status: "submitted",
                grade: "A+"
            },
            {
                id: "ds602-viz",
                title: "Data Visualization Project",
                subjectCode: "DS602",
                description: "Create an interactive dashboard using Plotly.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                status: "submitted",
                grade: "A"
            },
            {
                id: "ds603-dl",
                title: "Deep Learning Basics",
                subjectCode: "DS603",
                description: "Explain CNN architectures with examples.",
                dueDate: "2025-06-14",
                submissionDate: "2025-06-13",
                status: "submitted",
                grade: "B+"
            },
            {
                id: "ds604-bigdata",
                title: "Big Data Analytics",
                subjectCode: "DS604",
                description: "Use Apache Spark to process a dataset.",
                dueDate: "2025-06-16",
                submissionDate: "2025-06-15",
                status: "submitted",
                grade: "A-"
            },
            {
                id: "ds605-nlp",
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

const SubmittedAssignments = () => {
    const [selectedSemester, setSelectedSemester] = useState("all");
    const [sortBy, setSortBy] = useState("submissionDate"); // Default sort by submission date

    // Get unique semesters for the dropdown
    const uniqueSemesters = [...new Set(studentAssignmentData.map(d => d.semester.toString()))];

    // Filter data based on selected semester
    const filteredData = useMemo(() => {
        if (selectedSemester === "all") {
            return studentAssignmentData;
        }
        return studentAssignmentData.filter(d => d.semester.toString() === selectedSemester);
    }, [selectedSemester]);

    // Get all submitted assignments from filtered data
    const submittedAssignments = useMemo(() => {
        const assignments = filteredData.flatMap(d => d.assignments)
            .filter(assignment => assignment.status === "submitted");

        // Sort assignments based on selected sort option
        if (sortBy === "submissionDate") {
            return assignments.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)); // Most recent first
        } else if (sortBy === "subject") {
            return assignments.sort((a, b) => a.subjectCode.localeCompare(b.subjectCode));
        } else if (sortBy === "title") {
            return assignments.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "grade") {
            // Sort by grade (A+ > A > A- > B+ > B > etc.)
            const gradeOrder = { "A+": 0, "A": 1, "A-": 2, "B+": 3, "B": 4, "B-": 5, "C+": 6, "C": 7, "C-": 8, "D": 9, "F": 10 };
            return assignments.sort((a, b) => (gradeOrder[a.grade] || 99) - (gradeOrder[b.grade] || 99));
        }
        return assignments;
    }, [filteredData, sortBy]);

    // Calculate total submitted assignments
    const totalSubmitted = submittedAssignments.length;

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

        if (submittedAssignments.length === 0) return "N/A";

        const totalPoints = submittedAssignments.reduce((sum, a) => sum + (gradePoints[a.grade] || 0), 0);
        return (totalPoints / submittedAssignments.length).toFixed(2);
    }, [submittedAssignments]);

    // Count assignments by grade category
    const gradeDistribution = useMemo(() => {
        const distribution = {
            excellent: 0, // A+, A, A-
            good: 0,      // B+, B, B-
            average: 0,   // C+, C, C-
            poor: 0       // D, F
        };

        submittedAssignments.forEach(assignment => {
            const grade = assignment.grade;
            if (grade && grade.startsWith('A')) {
                distribution.excellent++;
            } else if (grade && grade.startsWith('B')) {
                distribution.good++;
            } else if (grade && grade.startsWith('C')) {
                distribution.average++;
            } else if (grade) {
                distribution.poor++;
            }
        });

        return distribution;
    }, [submittedAssignments]);

    return (
        <div className="flex flex-col space-y-6">
            {/* Header with Semester Selector */}
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-2xl font-bold">Submitted Assignments</h2>
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

                    {/* Sort Selector */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort by</SelectLabel>
                                <SelectItem value="submissionDate">Submission Date</SelectItem>
                                <SelectItem value="subject">Subject</SelectItem>
                                <SelectItem value="title">Title</SelectItem>
                                <SelectItem value="grade">Grade</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Submitted Assignments */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Submitted Assignments
                        </CardTitle>
                        <BookCheck className="w-5 h-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSubmitted}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">Completed tasks</CardFooter>
                </Card>

                {/* Average Grade */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Average Grade
                        </CardTitle>
                        <Award className="w-5 h-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{averageGrade}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">GPA for all assignments</CardFooter>
                </Card>

                {/* Excellent Grades */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Excellent Grades (A)
                        </CardTitle>
                        <Award className="w-5 h-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gradeDistribution.excellent}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">
                        {gradeDistribution.excellent > 0 
                            ? `${Math.round((gradeDistribution.excellent / totalSubmitted) * 100)}% of assignments` 
                            : "No assignments with A grade"}
                    </CardFooter>
                </Card>

                {/* Good Grades */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Good Grades (B)
                        </CardTitle>
                        <Award className="w-5 h-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gradeDistribution.good}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">
                        {gradeDistribution.good > 0 
                            ? `${Math.round((gradeDistribution.good / totalSubmitted) * 100)}% of assignments` 
                            : "No assignments with B grade"}
                    </CardFooter>
                </Card>
            </div>

            {/* Submitted Assignments List */}
            {submittedAssignments.length > 0 ? (
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
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {submittedAssignments.map((assignment, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{assignment.subjectCode}</TableCell>
                                        <TableCell>
                                            <Link href={`/student/assignments/${assignment.id}`} className="hover:underline cursor-pointer block">
                                                <div>
                                                    <div className="font-medium">{assignment.title}</div>
                                                    <div className="text-sm text-muted-foreground">{assignment.description}</div>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell>{assignment.submissionDate}</TableCell>
                                        <TableCell>
                                            <Badge className={`
                                                ${assignment.grade?.startsWith('A') ? 'bg-green-100 text-green-800' : 
                                                  assignment.grade?.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                                                  assignment.grade?.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                                                  'bg-red-100 text-red-800'}
                                            `}>
                                                {assignment.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/student/assignments/${assignment.id}`}>View Details</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <Card className="rounded-2xl shadow-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center py-10">
                        <BookCheck className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Submitted Assignments</h3>
                        <p className="text-muted-foreground">You haven't submitted any assignments yet.</p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default SubmittedAssignments;