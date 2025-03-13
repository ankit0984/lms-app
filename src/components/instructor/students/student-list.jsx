"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MoreHorizontal, Mail, FileText, AlertCircle, User, Clock } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for students
const mockStudents = Array.from({ length: 25 }, (_, i) => {
    const status = ["active", "at-risk", "inactive"][Math.floor(Math.random() * 3)]
    const enrollmentDate = new Date()
    enrollmentDate.setDate(enrollmentDate.getDate() - Math.floor(Math.random() * 60))

    return {
        id: `STU${1000 + i}`,
        name: [
            "John Doe",
            "Jane Smith",
            "Michael Johnson",
            "Emily Davis",
            "Robert Wilson",
            "Sarah Brown",
            "David Lee",
            "Lisa Chen",
            "James Taylor",
            "Maria Garcia",
        ][Math.floor(Math.random() * 10)],
        email: `student${1000 + i}@university.edu`,
        enrollmentDate: enrollmentDate.toISOString(),
        status,
        progress: Math.floor(Math.random() * 101), // 0-100
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString(), // Last 14 days
        courses: Math.floor(Math.random() * 4) + 1, // 1-4 courses
    }
})

export default function StudentList() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [courseFilter, setCourseFilter] = useState("all")
    const [students] = useState(mockStudents)

    // Filter students based on search and filters
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || student.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge variant="success">Active</Badge>
            case "at-risk":
                return <Badge variant="destructive">At Risk</Badge>
            case "inactive":
                return <Badge variant="outline">Inactive</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search students..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="at-risk">At Risk</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            <SelectItem value="CS101">CS101</SelectItem>
                            <SelectItem value="CS201">CS201</SelectItem>
                            <SelectItem value="CS301">CS301</SelectItem>
                            <SelectItem value="CS401">CS401</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => router.push("/instructor/enrollment")}>Add Students</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Enrollment Date</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead>Courses</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        No students found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-xs text-muted-foreground">{student.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{student.id}</TableCell>
                                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                                        <TableCell>{format(new Date(student.enrollmentDate), "MMM d, yyyy")}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                <span>{format(new Date(student.lastActive), "MMM d, yyyy")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{student.courses}</TableCell>
                                        <TableCell>
                                            <div className="flex w-full items-center gap-2">
                                                <div className="h-2 w-full rounded-full bg-secondary">
                                                    <div
                                                        className={`h-full rounded-full ${
                                                            student.progress >= 70
                                                                ? "bg-green-500"
                                                                : student.progress >= 40
                                                                    ? "bg-yellow-500"
                                                                    : "bg-red-500"
                                                        }`}
                                                        style={{ width: `${student.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs tabular-nums">{student.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => router.push(`/instructor/students/${student.id}`)}>
                                                        <User className="mr-2 h-4 w-4" />
                                                        View profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => router.push(`/instructor/grades?student=${student.id}`)}>
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        View grades
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => (window.location.href = `mailto:${student.email}`)}>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Send email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">
                                                        <AlertCircle className="mr-2 h-4 w-4" />
                                                        Flag as at-risk
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

