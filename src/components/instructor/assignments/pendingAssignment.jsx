"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { FileText, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock pending assignments data
const mockAssignments = [
    {
        id: "1",
        title: "Midterm Project",
        course: "CS101",
        student: "Jane Doe",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    },
    {
        id: "2",
        title: "Algorithm Analysis",
        course: "CS201",
        student: "John Smith",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    },
    {
        id: "3",
        title: "Database Design",
        course: "CS301",
        student: "Emily Johnson",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    },
    {
        id: "4",
        title: "Programming Exercise",
        course: "CS101",
        student: "Michael Brown",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago (overdue)
    },
]

export function PendingAssignments() {
    const router = useRouter()
    const [assignments] = useState(mockAssignments)

    const isOverdue = (dueDate) => {
        return dueDate < new Date()
    }

    return (
        <div className="space-y-4">
            {assignments.length === 0 ? (
                <div className="text-center py-4">
                    <p className="text-muted-foreground">No pending assignments</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex flex-col space-y-2 rounded-md border p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <h4 className="font-medium">{assignment.title}</h4>
                                    <Badge variant="outline">{assignment.course}</Badge>
                                </div>
                                <Button size="sm" onClick={() => router.push(`/instructor/assignments/${assignment.id}`)}>
                                    Grade
                                </Button>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-3.5 w-3.5" />
                                <span>{assignment.student}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Submitted {formatDistanceToNow(assignment.submittedAt, { addSuffix: true })}</span>
                                </div>
                                <div className={isOverdue(assignment.dueDate) ? "text-destructive" : "text-muted-foreground"}>
                                    {isOverdue(assignment.dueDate)
                                        ? `Overdue by ${formatDistanceToNow(assignment.dueDate)}`
                                        : `Due in ${formatDistanceToNow(assignment.dueDate)}`}
                                </div>
                            </div>
                            <Progress
                                value={isOverdue(assignment.dueDate) ? 100 : 0}
                                className={`h-1 ${isOverdue(assignment.dueDate) ? "bg-destructive/20" : ""}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

