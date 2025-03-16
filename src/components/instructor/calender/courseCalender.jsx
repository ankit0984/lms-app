"use client"

import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock calendar events
const mockEvents = [
    {
        id: "event-1",
        title: "CS101 Lecture",
        date: new Date(2023, 5, 15, 10, 0),
        endDate: new Date(2023, 5, 15, 11, 30),
        course: "CS101",
        type: "lecture",
        location: "Room 101",
        description: "Introduction to Computer Science lecture",
    },
    {
        id: "event-2",
        title: "CS201 Lab Session",
        date: new Date(2023, 5, 16, 14, 0),
        endDate: new Date(2023, 5, 16, 16, 0),
        course: "CS201",
        type: "lab",
        location: "Lab 3",
        description: "Data Structures lab session",
    },
    {
        id: "event-3",
        title: "Office Hours",
        date: new Date(2023, 5, 17, 13, 0),
        endDate: new Date(2023, 5, 17, 15, 0),
        course: "All",
        type: "office-hours",
        location: "Office 205",
        description: "Open office hours for all students",
    },
    {
        id: "event-4",
        title: "CS301 Midterm",
        date: new Date(2023, 5, 18, 9, 0),
        endDate: new Date(2023, 5, 18, 11, 0),
        course: "CS301",
        type: "exam",
        location: "Exam Hall",
        description: "Database Systems midterm exam",
    },
]

export default function InstructorCalendar() {
    const [date, setDate] = useState(new Date())
    const [events] = useState(mockEvents)
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: new Date(),
        startTime: "09:00",
        endTime: "10:30",
        course: "",
        type: "lecture",
        location: "",
        description: "",
    })

    // Filter events for the selected date
    const selectedDateEvents = events.filter((event) => date && event.date.toDateString() === date.toDateString())

    const handleAddEvent = () => {
        // In a real app, this would save the event to the database
        console.log("New event:", newEvent)
        setIsAddEventOpen(false)
        // Reset form
        setNewEvent({
            title: "",
            date: new Date(),
            startTime: "09:00",
            endTime: "10:30",
            course: "",
            type: "lecture",
            location: "",
            description: "",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-xl font-bold">Teaching Schedule</h2>
                    <p className="text-muted-foreground">Manage your classes, office hours, and other academic events</p>
                </div>
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Event</DialogTitle>
                            <DialogDescription>Create a new event on your teaching calendar</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input
                                    id="title"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    placeholder="e.g., CS101 Lecture"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <span className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {format(newEvent.date, "PPP")}
                    </span>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="course">Course</Label>
                                    <Select
                                        value={newEvent.course}
                                        onValueChange={(value) => setNewEvent({ ...newEvent, course: value })}
                                    >
                                        <SelectTrigger id="course">
                                            <SelectValue placeholder="Select course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CS101">CS101</SelectItem>
                                            <SelectItem value="CS201">CS201</SelectItem>
                                            <SelectItem value="CS301">CS301</SelectItem>
                                            <SelectItem value="CS401">CS401</SelectItem>
                                            <SelectItem value="All">All Courses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="startTime">Start Time</Label>
                                    <Input
                                        id="startTime"
                                        type="time"
                                        value={newEvent.startTime}
                                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="endTime">End Time</Label>
                                    <Input
                                        id="endTime"
                                        type="time"
                                        value={newEvent.endTime}
                                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Event Type</Label>
                                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="lecture">Lecture</SelectItem>
                                            <SelectItem value="lab">Lab Session</SelectItem>
                                            <SelectItem value="office-hours">Office Hours</SelectItem>
                                            <SelectItem value="exam">Exam</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                        placeholder="e.g., Room 101"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    placeholder="Add details about this event"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddEvent}>Add Event</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                <Card>
                    <CardContent className="p-4">
                        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}</CardTitle>
                        <CardDescription>
                            {selectedDateEvents.length === 0
                                ? "No events scheduled for this day"
                                : `${selectedDateEvents.length} events scheduled`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {selectedDateEvents.length === 0 ? (
                                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">No events for this day</p>
                                        <Button variant="outline" className="mt-4" onClick={() => setIsAddEventOpen(true)}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Event
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                selectedDateEvents.map((event) => (
                                    <div key={event.id} className="flex items-center justify-between rounded-md border p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-3 w-3 rounded-full ${
                                                        event.type === "lecture"
                                                            ? "bg-blue-500"
                                                            : event.type === "lab"
                                                                ? "bg-green-500"
                                                                : event.type === "office-hours"
                                                                    ? "bg-yellow-500"
                                                                    : "bg-red-500"
                                                    }`}
                                                />
                                                <h3 className="font-medium">{event.title}</h3>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {format(event.date, "h:mm a")} - {format(event.endDate, "h:mm a")}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {event.location} • {event.course}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

