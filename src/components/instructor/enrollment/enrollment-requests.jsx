"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, User, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock course data
const courses = [
    { id: "course1", title: "Introduction to Computer Science", code: "CS101" },
    { id: "course2", title: "Data Structures and Algorithms", code: "CS201" },
    { id: "course3", title: "Database Systems", code: "CS301" },
    { id: "course4", title: "Artificial Intelligence", code: "CS401" },
    { id: "course5", title: "Web Development Fundamentals", code: "CS150" },
]

// Mock enrollment requests
const mockRequests = [
    {
        id: "req1",
        studentName: "Sophie Williams",
        studentEmail: "sophie.williams@example.com",
        courseId: "course1",
        requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "pending",
    },
    {
        id: "req2",
        studentName: "Alex Johnson",
        studentEmail: "alex.johnson@example.com",
        courseId: "course2",
        requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: "pending",
    },
    {
        id: "req3",
        studentName: "Emma Davis",
        studentEmail: "emma.davis@example.com",
        courseId: "course1",
        requestDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: "pending",
    },
    {
        id: "req4",
        studentName: "Ryan Smith",
        studentEmail: "ryan.smith@example.com",
        courseId: "course3",
        requestDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: "pending",
    },
    {
        id: "req5",
        studentName: "Jessica Brown",
        studentEmail: "jessica.brown@example.com",
        courseId: "course5",
        requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "pending",
    },
]

export function EnrollmentRequests() {
    const [requests, setRequests] = useState(mockRequests)
    const [isProcessing, setIsProcessing] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)


    const handleApprove = async (id) => {
        setIsProcessing(id)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Update request status
            setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))

            toast.success("Request approved",{
                description: "The student has been enrolled in the course.",
            })
        } catch (error) {
            toast("Failed to approve the request. Please try again.")
        } finally {
            setIsProcessing(null)
        }
    }

    const handleReject = async (id) => {
        setIsProcessing(id)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Update request status
            setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))

            toast({
                title: "Request rejected",
                description: "The enrollment request has been rejected.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to reject the request. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsProcessing(null)
        }
    }

    // Filter requests by selected course
    const filteredRequests = selectedCourse ? requests.filter((req) => req.courseId === selectedCourse) : requests

    // Only show pending requests
    const pendingRequests = filteredRequests.filter((req) => req.status === "pending")

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{pendingRequests.length} pending enrollment requests</div>
                <Select value={selectedCourse || ""} onValueChange={(val) => setSelectedCourse(val || null)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All courses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All courses</SelectItem>
                        {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                                {course.code}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {pendingRequests.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="text-muted-foreground">No pending enrollment requests</div>
                    </CardContent>
                </Card>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Request Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingRequests.map((request) => {
                                const course = courses.find((c) => c.id === request.courseId)

                                return (
                                    <TableRow key={request.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{request.studentName}</div>
                                                    <div className="text-xs text-muted-foreground">{request.studentEmail}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal">
                                                {course?.code}
                                            </Badge>
                                            <div className="mt-1 text-xs">{course?.title}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                <span>{format(request.requestDate, "MMM d, yyyy")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 border-red-200 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                                                    onClick={() => handleReject(request.id)}
                                                    disabled={isProcessing === request.id}
                                                >
                                                    <X className="mr-1 h-4 w-4" />
                                                    Reject
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="h-8"
                                                    onClick={() => handleApprove(request.id)}
                                                    disabled={isProcessing === request.id}
                                                >
                                                    <Check className="mr-1 h-4 w-4" />
                                                    Approve
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

