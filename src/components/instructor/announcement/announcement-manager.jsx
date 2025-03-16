"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Plus, Search, Edit, Trash, MessageSquare, Bell, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock announcements data
const mockAnnouncements = [
    {
        id: "ann-1",
        title: "Midterm Exam Schedule",
        content:
            "The midterm exam for CS101 will be held on June 15th from 10:00 AM to 12:00 PM in Room 301. Please bring your student ID and a calculator.",
        course: "CS101",
        date: new Date(2023, 5, 10).toISOString(),
        pinned: true,
        author: "Dr. John Smith",
    },
    {
        id: "ann-2",
        title: "Assignment 3 Extended Deadline",
        content:
            "Due to the technical issues with the submission system, the deadline for Assignment 3 has been extended to June 20th at 11:59 PM.",
        course: "CS201",
        date: new Date(2023, 5, 8).toISOString(),
        pinned: false,
        author: "Dr. John Smith",
    },
    {
        id: "ann-3",
        title: "Guest Lecture: AI in Healthcare",
        content:
            "We will have a guest lecture on 'Applications of AI in Healthcare' by Dr. Sarah Johnson on June 22nd at 2:00 PM in the Main Auditorium. Attendance is optional but recommended.",
        course: "CS501",
        date: new Date(2023, 5, 5).toISOString(),
        pinned: false,
        author: "Dr. John Smith",
    },
    {
        id: "ann-4",
        title: "Lab Session Canceled",
        content:
            "The lab session for CS301 scheduled for June 12th is canceled due to maintenance in the lab. The session will be rescheduled for June 14th at the same time.",
        course: "CS301",
        date: new Date(2023, 5, 3).toISOString(),
        pinned: false,
        author: "Dr. John Smith",
    },
]

export default function AnnouncementManager() {
    const [announcements] = useState(mockAnnouncements)
    const [searchQuery, setSearchQuery] = useState("")
    const [courseFilter, setCourseFilter] = useState("all")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        content: "",
        course: "",
        pinned: false,
    })

    // Filter announcements based on search and course filter
    const filteredAnnouncements = announcements.filter((announcement) => {
        const matchesSearch =
            announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.content.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCourse = courseFilter === "all" || announcement.course === courseFilter

        return matchesSearch && matchesCourse
    })

    const handleCreateAnnouncement = () => {
        // In a real app, this would save the announcement to the database
        console.log("New announcement:", newAnnouncement)
        setIsCreateDialogOpen(false)
        // Reset form
        setNewAnnouncement({
            title: "",
            content: "",
            course: "",
            pinned: false,
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search announcements..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
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
                            <SelectItem value="CS501">CS501</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Announcement
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create New Announcement</DialogTitle>
                            <DialogDescription>Create a new announcement for your students</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={newAnnouncement.title}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                    placeholder="e.g., Midterm Exam Schedule"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="course">Course</Label>
                                <Select
                                    value={newAnnouncement.course}
                                    onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, course: value })}
                                >
                                    <SelectTrigger id="course">
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CS101">CS101</SelectItem>
                                        <SelectItem value="CS201">CS201</SelectItem>
                                        <SelectItem value="CS301">CS301</SelectItem>
                                        <SelectItem value="CS401">CS401</SelectItem>
                                        <SelectItem value="CS501">CS501</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={newAnnouncement.content}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                                    placeholder="Enter the announcement content..."
                                    className="min-h-[150px]"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="pinned"
                                    checked={newAnnouncement.pinned}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, pinned: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="pinned">Pin this announcement</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateAnnouncement}>
                                <Send className="mr-2 h-4 w-4" />
                                Publish Announcement
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Announcements</TabsTrigger>
                    <TabsTrigger value="pinned">Pinned</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {filteredAnnouncements.length === 0 ? (
                        <Card>
                            <CardContent className="flex h-[200px] items-center justify-center">
                                <div className="text-center">
                                    <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">No announcements found</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredAnnouncements.map((announcement) => (
                            <Card key={announcement.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="flex items-center gap-2">
                                                {announcement.title}
                                                {announcement.pinned && <Badge variant="secondary">Pinned</Badge>}
                                            </CardTitle>
                                            <CardDescription>
                                                {announcement.course} • {format(new Date(announcement.date), "MMMM d, yyyy")} •{" "}
                                                {announcement.author}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-line">{announcement.content}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" size="sm">
                                        <Bell className="mr-2 h-4 w-4" />
                                        Send Notification
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        View Responses
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="pinned" className="space-y-4">
                    {filteredAnnouncements.filter((a) => a.pinned).length === 0 ? (
                        <Card>
                            <CardContent className="flex h-[200px] items-center justify-center">
                                <div className="text-center">
                                    <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">No pinned announcements</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredAnnouncements
                            .filter((a) => a.pinned)
                            .map((announcement) => (
                                <Card key={announcement.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <CardTitle className="flex items-center gap-2">
                                                    {announcement.title}
                                                    <Badge variant="secondary">Pinned</Badge>
                                                </CardTitle>
                                                <CardDescription>
                                                    {announcement.course} • {format(new Date(announcement.date), "MMMM d, yyyy")} •{" "}
                                                    {announcement.author}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-line">{announcement.content}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" size="sm">
                                            <Bell className="mr-2 h-4 w-4" />
                                            Send Notification
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            View Responses
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                    )}
                </TabsContent>

                <TabsContent value="recent" className="space-y-4">
                    {filteredAnnouncements.slice(0, 3).length === 0 ? (
                        <Card>
                            <CardContent className="flex h-[200px] items-center justify-center">
                                <div className="text-center">
                                    <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">No recent announcements</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredAnnouncements.slice(0, 3).map((announcement) => (
                            <Card key={announcement.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="flex items-center gap-2">
                                                {announcement.title}
                                                {announcement.pinned && <Badge variant="secondary">Pinned</Badge>}
                                            </CardTitle>
                                            <CardDescription>
                                                {announcement.course} • {format(new Date(announcement.date), "MMMM d, yyyy")} •{" "}
                                                {announcement.author}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-line">{announcement.content}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" size="sm">
                                        <Bell className="mr-2 h-4 w-4" />
                                        Send Notification
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        View Responses
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

