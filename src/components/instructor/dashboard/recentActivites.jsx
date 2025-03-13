"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, FileText, Users, BookOpen, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Mock activities data
const mockActivities = [
    {
        id: "1",
        type: "submission",
        course: "CS101",
        description: "New assignment submission from Jane Doe",
        time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: "pending",
    },
    {
        id: "2",
        type: "question",
        course: "CS201",
        description: "New question in discussion forum",
        time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: "pending",
    },
    {
        id: "3",
        type: "enrollment",
        course: "CS301",
        description: "3 new students enrolled in your course",
        time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        status: "info",
    },
    {
        id: "4",
        type: "material",
        course: "CS101",
        description: "You uploaded new course materials",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: "completed",
    },
    {
        id: "5",
        type: "submission",
        course: "CS201",
        description: "You graded 15 assignment submissions",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        status: "completed",
    },
]

export function RecentActivities() {
    const router = useRouter()
    const [activities] = useState(mockActivities)

    const getActivityIcon = (type) => {
        switch (type) {
            case "submission":
                return <FileText className="h-4 w-4" />
            case "question":
                return <MessageSquare className="h-4 w-4" />
            case "enrollment":
                return <Users className="h-4 w-4" />
            case "material":
                return <BookOpen className="h-4 w-4" />
            default:
                return <HelpCircle className="h-4 w-4" />
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            default:
                return null
        }
    }

    const getActivityAction = (activity) => {
        switch (activity.type) {
            case "submission":
                return activity.status === "pending" ? (
                    <Button size="sm" variant="outline" onClick={() => router.push(`/instructor/assignments/${activity.id}`)}>
                        Review
                    </Button>
                ) : null
            case "question":
                return (
                    <Button size="sm" variant="outline" onClick={() => router.push(`/instructor/discussions/${activity.id}`)}>
                        Answer
                    </Button>
                )
            case "enrollment":
                return (
                    <Button size="sm" variant="outline" onClick={() => router.push(`/courses/${activity.course}/students`)}>
                        View
                    </Button>
                )
            default:
                return null
        }
    }

    return (
        <div className="space-y-4">
            {activities.length === 0 ? (
                <div className="text-center py-4">
                    <p className="text-muted-foreground">No recent activities</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">{activity.description}</p>
                                    {getStatusIcon(activity.status)}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">
                                            {activity.course}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(activity.time, { addSuffix: true })}
                                        </p>
                                    </div>
                                    {getActivityAction(activity)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

