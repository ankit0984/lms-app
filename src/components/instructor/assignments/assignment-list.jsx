"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Plus, MoreHorizontal, FileText, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react"

// Mock assignments data
const mockAssignments = Array.from({ length: 50 }, (_, i) => {
    const status = ["submitted", "graded", "late", "pending"][Math.floor(Math.random() * 4)]
    const daysAgo = Math.floor(Math.random() * 14) + 1
    const submissionDate = new Date()
    submissionDate.setDate(submissionDate.getDate() - daysAgo)

    return {
        id: `${i + 1}`,
        title: `Assignment ${i + 1}`,
        courseCode: ["CS101", "CS201", "CS301"][Math.floor(Math.random() * 3)],
        courseName: ["Introduction to Computer Science", "Data Structures and Algorithms", "Database Systems"][
            Math.floor(Math.random() * 3)
            ],
        studentName: ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "Robert Wilson"][
            Math.floor(Math.random() * 5)
            ],
        studentId: `STU${1000 + Math.floor(Math.random() * 1000)}`,
        submissionDate: submissionDate.toISOString(),
        dueDate: new Date(submissionDate.getTime() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days after submission
        status,
        grade: status === "graded" ? Math.floor(Math.random() * 31) + 70 : null, // 70-100 if graded
    }
})

export default function InstructorAssignmentsList() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [courseFilter, setCourseFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [assignments] = useState(mockAssignments)

    const itemsPerPage = 10
    const filteredAssignments = assignments.filter((assignment) => {
        const matchesSearch =
            assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.studentId.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCourse = courseFilter === "all" || assignment.courseCode === courseFilter
        const matchesStatus = statusFilter === "all" || assignment.status === statusFilter

        return matchesSearch && matchesCourse && matchesStatus
    })

    const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
    const currentAssignments = filteredAssignments.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    const getStatusBadge = (status) => {
        switch (status) {
            case "graded":
                return <Badge variant="success">Graded</Badge>
            case "submitted":
                return <Badge variant="secondary">Submitted</Badge>
            case "late":
                return <Badge variant="destructive">Late</Badge>
            case "pending":
                return <Badge variant="outline">Pending</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "graded":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case "submitted":
                return <FileText className="h-4 w-4 text-blue-500" />
            case "late":
                return <AlertCircle className="h-4 w-4 text-red-500" />
            case "pending":
                return <Clock className="h-4 w-4 text-yellow-500" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by assignment title, student name, or ID..."
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
                            <SelectItem value="CS101">CS101</SelectItem>
                            <SelectItem value="CS201">CS201</SelectItem>
                            <SelectItem value="CS301">CS301</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="submitted">Submitted</SelectItem>
                            <SelectItem value="graded">Graded</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={() => router.push("/instructor/create-assignment")} className="w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        New Assignment
                    </Button>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Submission Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentAssignments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No assignments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentAssignments.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(assignment.status)}
                                            <span className="font-medium">{assignment.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{assignment.courseCode}</span>
                                            <span className="text-xs text-muted-foreground">{assignment.courseName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{assignment.studentName}</TableCell>
                                    <TableCell>{assignment.studentId}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{format(new Date(assignment.submissionDate), "MMM d, yyyy")}</span>
                                            <span className="text-xs text-muted-foreground">
                        {format(new Date(assignment.submissionDate), "h:mm a")}
                      </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                                    <TableCell>
                                        {assignment.grade !== null ? (
                                            <span className="font-medium">{assignment.grade}/100</span>
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
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
                                                <DropdownMenuItem onClick={() => router.push(`/instructor/assignments/${assignment.id}`)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View submission
                                                </DropdownMenuItem>
                                                {assignment.status !== "graded" && (
                                                    <DropdownMenuItem onClick={() => router.push(`/instructor/assignments/${assignment.id}`)}>
                                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                                        Grade assignment
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => router.push(`/instructor/grades?student=${assignment.studentId}`)}
                                                >
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View student grades
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage((p) => Math.max(1, p - 1))
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === p}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPage(p)
                                    }}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage((p) => Math.min(totalPages, p + 1))
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

