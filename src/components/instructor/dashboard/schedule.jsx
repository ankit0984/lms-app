"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock schedule data
const mockSchedule = [
    {
        id: "1",
        courseCode: "CS101",
        courseTitle: "Introduction to Computer Science",
        date: addDays(new Date(), 1),
        startTime: "10:00",
        endTime: "11:30",
        location: "Room 101",
        type: "lecture",
    },
    {
        id: "2",
        courseCode: "CS201",
        courseTitle: "Data Structures and Algorithms",
        date: addDays(new Date(), 1),
        startTime: "14:00",
        endTime: "15:30",
        location: "Room 203",
        type: "lecture",
    },
    {
        id: "3",
        courseCode: "CS101",
        courseTitle: "Introduction to Computer Science",
        date: addDays(new Date(), 2),
        startTime: "13:00",
        endTime: "14:00",
        location: "Office 305",
        type: "office-hours",
    },
    {
        id: "4",
        courseCode: "CS301",
        courseTitle: "Database Systems",
        date: addDays(new Date(), 3),
        startTime: "11:30",
        endTime: "13:00",
        location: "Room 105",
        type: "lecture",
    },
    {
        id: "5",
        courseCode: "CS201",
        courseTitle: "Data Structures and Algorithms",
        date: addDays(new Date(), 4),
        startTime: "14:00",
        endTime: "15:30",
        location: "Room 203",
        type: "lecture",
    },
    {
        id: "6",
        courseCode: "CS301",
        courseTitle: "Database Systems",
        date: addDays(new Date(), 5),
        startTime: "10:00",
        endTime: "11:00",
        location: "Lab 204",
        type: "lab",
    },
]



export function InstructorSchedule({ compact = false }) {
    const [selectedDate, setSelectedDate] = useState(new Date())

    // Get the start of the current week
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })

    // Generate the week days
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    // Filter sessions for the selected date or for the next few days if compact
    const filteredSessions = compact
        ? mockSchedule.slice(0, 4)
        : mockSchedule.filter((session) => isSameDay(session.date, selectedDate))

    const getSessionTypeColor = (type) => {
        switch (type) {
            case "lecture":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "lab":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "office-hours":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }

    if (compact) {
        return (
            <div className="space-y-4">
                {filteredSessions.map((session) => (
                    <div key={session.id} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{session.courseTitle}</p>
                                <Badge variant="outline" className="text-xs">
                                    {session.courseCode}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {format(session.date, "EEEE, MMMM d")} • {session.startTime} - {session.endTime}
                            </p>
                            <p className="text-sm text-muted-foreground">{session.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex space-x-2 overflow-auto pb-2">
                {weekDays.map((date) => (
                    <Button
                        key={date.toString()}
                        variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                        className="flex flex-col items-center px-3"
                        onClick={() => setSelectedDate(date)}
                    >
                        <span className="text-xs">{format(date, "EEE")}</span>
                        <span className="text-xl font-bold">{format(date, "d")}</span>
                    </Button>
                ))}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
                    <div className="flex gap-2">
                        <Badge className={cn("text-xs", getSessionTypeColor("lecture"))}>Lecture</Badge>
                        <Badge className={cn("text-xs", getSessionTypeColor("lab"))}>Lab</Badge>
                        <Badge className={cn("text-xs", getSessionTypeColor("office-hours"))}>Office Hours</Badge>
                    </div>
                </div>

                {filteredSessions.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">No sessions scheduled for this day</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-2">
                        {filteredSessions.map((session) => (
                            <Card key={session.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium">{session.courseTitle}</h4>
                                                <Badge variant="outline">{session.courseCode}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1">
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    <span>
                            {session.startTime} - {session.endTime}
                          </span>
                                                </div>
                                                <div className="text-sm text-muted-foreground">{session.location}</div>
                                            </div>
                                        </div>
                                        <Badge className={cn(getSessionTypeColor(session.type))}>
                                            {session.type === "lecture" ? "Lecture" : session.type === "lab" ? "Lab" : "Office Hours"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

