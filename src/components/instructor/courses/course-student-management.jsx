"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {toast} from "sonner";
import { Search, MoreHorizontal, UserPlus, Mail, FileText, AlertCircle, User, Clock } from "lucide-react"
import { format } from "date-fns"

// Mock course data
const getMockCourse = (id) => {
    return {
        id,
        code: "CS101",
        title: "Introduction to Computer Science",
        instructor: "Dr. John Smith",
        department: "Computer Science",
        enrolledStudents: 25,
        maxStudents: 30,
    }
}

// Mock student data
const getMockStudents = (courseId) => {
    return Array.from({ length: 25 }, (_, i) => {
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
            grade: status !== "inactive" ? Math.floor(Math.random() * 31) + 70 : null, // 70-100 if active
        }
    })
}


export default function CourseStudentManagement({ courseId }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [newStudentEmail, setNewStudentEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [course] = useState(getMockCourse(courseId))
    const [students] = useState(getMockStudents(courseId))

    // Filter students based on search and status filter
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || student.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleAddStudent = async () => {
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success("Invitation Sent",{
                description: `An invitation has been sent to ${newStudentEmail}`,
            })

            setNewStudentEmail("")
            setShowAddStudentDialog(false)
        } catch (error) {
            toast.error("Error",{
                description: "Failed to send invitation. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleRemoveStudent = async () => {
        if (!selectedStudent) return

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success("Student Removed",{

                description: `${selectedStudent.name} has been removed from the course.`,
            })

            setShowRemoveDialog(false)
            setSelectedStudent(null)
        } catch (error) {
            toast.error("error",{
                description: "Failed to remove student. Please try again.",

            })
        } finally {
            setIsSubmitting(false)
        }
    }

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
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{course.title} - Student Management</h1>
                <p className="text-muted-foreground">
                    {course.code} • {course.enrolledStudents} enrolled of {course.maxStudents} maximum
                </p>
            </div>

            <Tabs defaultValue="enrolled" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="enrolled">Enrolled Students</TabsTrigger>
                    <TabsTrigger value="progress">Student Progress</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                </TabsList>

                <TabsContent value="enrolled" className="space-y-4">
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
                            <select
                                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="at-risk">At Risk</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <Button onClick={() => setShowAddStudentDialog(true)}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Student
                        </Button>
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
                                        <TableHead>Progress</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-24 text-center">
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
                                                            <DropdownMenuItem onClick={() => router.push(`/instructor/courses/grades?student=${student.id}`)}>
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                View grades
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => (window.location.href = `mailto:${student.email}`)}>
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                Send email
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedStudent(student)
                                                                    setShowRemoveDialog(true)
                                                                }}
                                                                className="text-destructive focus:text-destructive"
                                                            >
                                                                <AlertCircle className="mr-2 h-4 w-4" />
                                                                Remove from course
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
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Progress</CardTitle>
                            <CardDescription>Track student engagement and course completion</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {filteredStudents.map((student) => (
                                    <div key={student.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-xs text-muted-foreground">{student.id}</div>
                                                </div>
                                            </div>
                                            {getStatusBadge(student.status)}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Course Progress</span>
                                                <span className="font-medium">{student.progress}%</span>
                                            </div>
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
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Last active: {format(new Date(student.lastActive), "MMM d, yyyy")}</span>
                                                <span>Enrolled: {format(new Date(student.enrollmentDate), "MMM d, yyyy")}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="grades" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Grades</CardTitle>
                            <CardDescription>View and manage student grades for this course</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Current Grade</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-xs text-muted-foreground">{student.email}</div>
                                            </TableCell>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{getStatusBadge(student.status)}</TableCell>
                                            <TableCell>
                                                {student.grade ? (
                                                    <div className="font-medium">{student.grade}/100</div>
                                                ) : (
                                                    <div className="text-muted-foreground">No grade</div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => router.push(`/instructor/grades?student=${student.id}`)}
                                                >
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add Student Dialog */}
            <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Student to Course</DialogTitle>
                        <DialogDescription>
                            Enter the email address of the student you want to add to {course.title}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Student Email
                            </label>
                            <Input
                                id="email"
                                placeholder="student@university.edu"
                                value={newStudentEmail}
                                onChange={(e) => setNewStudentEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddStudent} disabled={!newStudentEmail || isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Invitation"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remove Student Dialog */}
            <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Student</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove {selectedStudent?.name} from this course? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleRemoveStudent} disabled={isSubmitting}>
                            {isSubmitting ? "Removing..." : "Remove Student"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

