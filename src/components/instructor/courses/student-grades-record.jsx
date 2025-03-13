"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, BarChart3 } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

// Mock student grade data
const generateMockGrades = () => {
    const students = [
        { id: "STU1001", name: "John Doe" },
        { id: "STU1002", name: "Jane Smith" },
        { id: "STU1003", name: "Michael Johnson" },
        { id: "STU1004", name: "Emily Davis" },
        { id: "STU1005", name: "Robert Wilson" },
        { id: "STU1234", name: "Emily Johnson" },
    ]

    const assignments = [
        { id: "A1", title: "Assignment 1", course: "CS101", maxScore: 100 },
        { id: "A2", title: "Assignment 2", course: "CS101", maxScore: 100 },
        { id: "A3", title: "Midterm Project", course: "CS101", maxScore: 100 },
        { id: "A4", title: "Final Project", course: "CS101", maxScore: 100 },
        { id: "A5", title: "Assignment 1", course: "CS201", maxScore: 100 },
        { id: "A6", title: "Assignment 2", course: "CS201", maxScore: 100 },
        { id: "A7", title: "Midterm Project", course: "CS201", maxScore: 100 },
        { id: "A8", title: "Assignment 1", course: "CS301", maxScore: 100 },
        { id: "A9", title: "Midterm Project", course: "CS301", maxScore: 100 },
    ]

    const grades = []

    for (const student of students) {
        for (const assignment of assignments) {
            // Not all students have all assignments
            if (Math.random() > 0.2) {
                const score = Math.floor(Math.random() * 31) + 70 // 70-100
                grades.push({
                    id: `${student.id}-${assignment.id}`,
                    studentId: student.id,
                    studentName: student.name,
                    assignmentId: assignment.id,
                    assignmentTitle: assignment.title,
                    course: assignment.course,
                    score,
                    percentage: (score / assignment.maxScore) * 100,
                    submissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
                    feedback: "Good work overall. Some areas could be improved.",
                })
            }
        }
    }

    return grades
}

export default function StudentGradeRecords() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const studentParam = searchParams.get("student")

    const [searchQuery, setSearchQuery] = useState("")
    const [courseFilter, setCourseFilter] = useState("all")
    const [studentFilter, setStudentFilter] = useState(studentParam || "all")
    const [grades] = useState(generateMockGrades())
    const [activeTab, setActiveTab] = useState("table")

    // Get unique students and courses for filters
    const uniqueStudents = Array.from(new Set(grades.map((grade) => grade.studentId))).map((id) => {
        const grade = grades.find((g) => g.studentId === id)
        return { id, name: grade?.studentName || "" }
    })

    const uniqueCourses = Array.from(new Set(grades.map((grade) => grade.course)))

    // Filter grades based on search and filters
    const filteredGrades = grades.filter((grade) => {
        const matchesSearch =
            grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grade.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grade.studentId.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCourse = courseFilter === "all" || grade.course === courseFilter
        const matchesStudent = studentFilter === "all" || grade.studentId === studentFilter

        return matchesSearch && matchesCourse && matchesStudent
    })

    // Calculate average grades by assignment for chart
    const assignmentAverages = uniqueCourses.map((course) => {
        const courseGrades = grades.filter((grade) => grade.course === course)
        const assignmentTitles = Array.from(new Set(courseGrades.map((grade) => grade.assignmentTitle)))

        const data = assignmentTitles.map((title) => {
            const assignmentGrades = courseGrades.filter((grade) => grade.assignmentTitle === title)
            const average = assignmentGrades.reduce((sum, grade) => sum + grade.score, 0) / assignmentGrades.length

            return {
                assignment: title,
                average: Math.round(average * 10) / 10,
                course,
            }
        })

        return { course, data }
    })

    // Calculate student performance data for selected student
    const studentPerformance =
        studentFilter !== "all"
            ? filteredGrades.map((grade) => ({
                assignment: `${grade.assignmentTitle} (${grade.course})`,
                score: grade.score,
                average:
                    assignmentAverages
                        .find((avg) => avg.course === grade.course)
                        ?.data.find((d) => d.assignment === grade.assignmentTitle)?.average || 0,
            }))
            : []

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by student name, ID, or assignment..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:flex md:items-center">
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            {uniqueCourses.map((course) => (
                                <SelectItem key={course} value={course}>
                                    {course}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={studentFilter} onValueChange={setStudentFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by student" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Students</SelectItem>
                            {uniqueStudents.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                    {student.name} ({student.id})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => router.push("/instructor/assignments")} className="w-full md:w-auto">
                        <FileText className="mr-2 h-4 w-4" />
                        Assignments
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/instructor/dashboard")} className="w-full md:w-auto">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                </div>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="table">Grade Table</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="table" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Grades</CardTitle>
                            <CardDescription>
                                {studentFilter !== "all"
                                    ? `Viewing grades for ${uniqueStudents.find((s) => s.id === studentFilter)?.name || studentFilter}`
                                    : "Viewing grades for all students"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Course</TableHead>
                                            <TableHead>Assignment</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead>Percentage</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredGrades.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center">
                                                    No grades found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredGrades.map((grade) => (
                                                <TableRow key={grade.id}>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{grade.studentName}</span>
                                                            <span className="text-xs text-muted-foreground">{grade.studentId}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{grade.course}</Badge>
                                                    </TableCell>
                                                    <TableCell>{grade.assignmentTitle}</TableCell>
                                                    <TableCell className="font-medium">{grade.score}/100</TableCell>
                                                    <TableCell>{grade.percentage.toFixed(1)}%</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={
                                                                grade.score >= 90
                                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                    : grade.score >= 80
                                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                                        : grade.score >= 70
                                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                            }
                                                        >
                                                            {grade.score >= 90
                                                                ? "A"
                                                                : grade.score >= 80
                                                                    ? "B"
                                                                    : grade.score >= 70
                                                                        ? "C"
                                                                        : grade.score >= 60
                                                                            ? "D"
                                                                            : "F"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => router.push(`/instructor/assignments/${grade.assignmentId}`)}
                                                        >
                                                            View
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="mt-4">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Assignment Averages by Course</CardTitle>
                                <CardDescription>Average scores for each assignment across courses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue={uniqueCourses[0]} className="w-full">
                                    <TabsList className="w-full">
                                        {uniqueCourses.map((course) => (
                                            <TabsTrigger key={course} value={course} className="flex-1">
                                                {course}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {uniqueCourses.map((course) => (
                                        <TabsContent key={course} value={course} className="mt-4">
                                            <div className="h-[300px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={assignmentAverages.find((avg) => avg.course === course)?.data || []}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="assignment" />
                                                        <YAxis domain={[0, 100]} />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="average" name="Average Score" fill="#4f46e5" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>

                        {studentFilter !== "all" && studentPerformance.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Performance</CardTitle>
                                    <CardDescription>
                                        Comparing {uniqueStudents.find((s) => s.id === studentFilter)?.name || studentFilter}'s scores to
                                        class averages
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={studentPerformance} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                                <XAxis type="number" domain={[0, 100]} />
                                                <YAxis dataKey="assignment" type="category" width={150} />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="score" name="Student Score" fill="#4f46e5" />
                                                <Bar dataKey="average" name="Class Average" fill="#10b981" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {(studentFilter === "all" || studentPerformance.length === 0) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Grade Distribution</CardTitle>
                                    <CardDescription>Distribution of grades across all assignments</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={[
                                                    { grade: "A", count: filteredGrades.filter((g) => g.score >= 90).length },
                                                    { grade: "B", count: filteredGrades.filter((g) => g.score >= 80 && g.score < 90).length },
                                                    { grade: "C", count: filteredGrades.filter((g) => g.score >= 70 && g.score < 80).length },
                                                    { grade: "D", count: filteredGrades.filter((g) => g.score >= 60 && g.score < 70).length },
                                                    { grade: "F", count: filteredGrades.filter((g) => g.score < 60).length },
                                                ]}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="grade" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="count" name="Number of Grades" fill="#4f46e5" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {studentFilter !== "all" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Student Summary</CardTitle>
                        <CardDescription>
                            Performance summary for {uniqueStudents.find((s) => s.id === studentFilter)?.name || studentFilter}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="rounded-lg border p-3">
                                <div className="text-sm font-medium text-muted-foreground">Average Score</div>
                                <div className="mt-1 text-2xl font-bold">
                                    {(filteredGrades.reduce((sum, grade) => sum + grade.score, 0) / filteredGrades.length).toFixed(1)}%
                                </div>
                            </div>
                            <div className="rounded-lg border p-3">
                                <div className="text-sm font-medium text-muted-foreground">Assignments Completed</div>
                                <div className="mt-1 text-2xl font-bold">{filteredGrades.length}</div>
                            </div>
                            <div className="rounded-lg border p-3">
                                <div className="text-sm font-medium text-muted-foreground">Highest Grade</div>
                                <div className="mt-1 text-2xl font-bold">
                                    {Math.max(...filteredGrades.map((grade) => grade.score))}%
                                </div>
                            </div>
                            <div className="rounded-lg border p-3">
                                <div className="text-sm font-medium text-muted-foreground">Lowest Grade</div>
                                <div className="mt-1 text-2xl font-bold">
                                    {Math.min(...filteredGrades.map((grade) => grade.score))}%
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

