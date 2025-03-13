"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Upload, X, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {toast} from "sonner"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const courseSchema = z.object({
    code: z.string().min(2, "Course code is required"),
    title: z.string().min(3, "Course title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    department: z.string().min(1, "Department is required"),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    maxStudents: z.string().min(1, "Maximum students is required"),
    enrollmentType: z.enum(["open", "approval", "closed"]),
    status: z.enum(["draft", "published"]),
    isVisible: z.boolean().default(true),
    allowLateSubmissions: z.boolean().default(false),
    gradeScheme: z.enum(["percentage", "letter", "pass-fail"]),
})

// Mock departments data
const mockDepartments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Business",
    "Arts",
    "Humanities",
]

export default function InstructorCourseForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [schedules, setSchedules] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [customTag, setCustomTag] = useState("")
    const [thumbnailPreview, setThumbnailPreview] = useState(null)
    const [activeTab, setActiveTab] = useState("basic")
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            code: "",
            title: "",
            description: "",
            department: "",
            maxStudents: "30",
            enrollmentType: "open",
            status: "draft",
            isVisible: true,
            allowLateSubmissions: false,
            gradeScheme: "percentage",
        },
    })

    async function onSubmit(data) {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            console.log("Form data:", data)
            console.log("Files:", files)
            console.log("Schedules:", schedules)
            console.log("Tags:", selectedTags)
            console.log("Thumbnail:", thumbnailPreview ? "Uploaded" : "None")

            toast.success("Course Created",{
                description: "The course has been created successfully.",
            })

            router.push("/instructor/dashboard")
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files || [])
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
    }

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }

    const addSchedule = () => {
        setSchedules([...schedules, { day: "Monday", startTime: "09:00", endTime: "10:30", location: "" }])
    }

    const updateSchedule = (index, field, value) => {
        const updatedSchedules = [...schedules]
        updatedSchedules[index] = {
            ...updatedSchedules[index],
            [field]: value,
        }
        setSchedules(updatedSchedules)
    }

    const removeSchedule = (index) => {
        setSchedules(schedules.filter((_, i) => i !== index))
    }

    const toggleTag = (tag) => {
        setSelectedTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]))
    }

    const addCustomTag = () => {
        if (customTag.trim()) {
            setSelectedTags((current) => [...current, customTag.trim()])
            setCustomTag("")
        }
    }

    const handleThumbnailUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setThumbnailPreview(e.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule</TabsTrigger>
                        <TabsTrigger value="materials">Materials</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                            <TabsContent value="basic" className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="CS101" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Introduction to Computer Science" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter course description..." className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {mockDepartments.map((department) => (
                                                        <SelectItem key={department} value={department}>
                                                            {department}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Start Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>End Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date < (form.getValues)}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="maxStudents"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Maximum Students</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="1" {...field} />
                                            </FormControl>
                                            <FormDescription>Maximum number of students that can enroll in this course</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-4">
                                    <FormLabel>Course Thumbnail</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <div className="border rounded-md p-2 w-40 h-24 flex items-center justify-center bg-muted">
                                            {thumbnailPreview ? (
                                                <img
                                                    src={thumbnailPreview}
                                                    alt="Thumbnail preview"
                                                    className="max-w-full max-h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-muted-foreground text-sm text-center">No thumbnail</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleThumbnailUpload}
                                                className="hidden"
                                                id="course-thumbnail"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => document.getElementById("course-thumbnail")?.click()}
                                            >
                                                Upload Thumbnail
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <FormLabel>Course Tags</FormLabel>
                                    <FormDescription>Add tags to help categorize and make your course discoverable</FormDescription>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Beginner",
                                            "Intermediate",
                                            "Advanced",
                                            "Programming",
                                            "Design",
                                            "Business",
                                            "Science",
                                            "Mathematics",
                                        ].map((tag) => (
                                            <div
                                                key={tag}
                                                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                                                    selectedTags.includes(tag)
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-secondary text-secondary-foreground"
                                                }`}
                                                onClick={() => toggleTag(tag)}
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 items-center mt-2">
                                        <Input
                                            placeholder="Add custom tag"
                                            value={customTag}
                                            onChange={(e) => setCustomTag(e.target.value)}
                                            className="max-w-xs"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addCustomTag}
                                            disabled={!customTag.trim()}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="schedule" className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Class Sessions</FormLabel>
                                        <Button type="button" variant="outline" size="sm" onClick={addSchedule}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Session
                                        </Button>
                                    </div>
                                    <FormDescription>Set up the weekly schedule for this course</FormDescription>

                                    {schedules.length === 0 ? (
                                        <div className="rounded-md border border-dashed p-8 text-center">
                                            <p className="text-muted-foreground">No sessions added yet</p>
                                            <Button type="button" variant="outline" className="mt-4" onClick={addSchedule}>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add First Session
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {schedules.map((schedule, index) => (
                                                <div key={index} className="grid gap-4 rounded-md border p-4 md:grid-cols-5">
                                                    <div>
                                                        <FormLabel className="text-xs">Day</FormLabel>
                                                        <Select value={schedule.day} onValueChange={(value) => updateSchedule(index, "day", value)}>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Monday">Monday</SelectItem>
                                                                <SelectItem value="Tuesday">Tuesday</SelectItem>
                                                                <SelectItem value="Wednesday">Wednesday</SelectItem>
                                                                <SelectItem value="Thursday">Thursday</SelectItem>
                                                                <SelectItem value="Friday">Friday</SelectItem>
                                                                <SelectItem value="Saturday">Saturday</SelectItem>
                                                                <SelectItem value="Sunday">Sunday</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <FormLabel className="text-xs">Start Time</FormLabel>
                                                        <Input
                                                            type="time"
                                                            value={schedule.startTime}
                                                            onChange={(e) => updateSchedule(index, "startTime", e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FormLabel className="text-xs">End Time</FormLabel>
                                                        <Input
                                                            type="time"
                                                            value={schedule.endTime}
                                                            onChange={(e) => updateSchedule(index, "endTime", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <FormLabel className="text-xs">Location</FormLabel>
                                                        <div className="flex gap-2">
                                                            <Input
                                                                placeholder="Room number or location"
                                                                value={schedule.location}
                                                                onChange={(e) => updateSchedule(index, "location", e.target.value)}
                                                                className="flex-1"
                                                            />
                                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeSchedule(index)}>
                                                                <Trash className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="materials" className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <FormLabel>Upload Materials</FormLabel>
                                        <FormDescription>
                                            Upload syllabus, lecture notes, assignments, and other course materials
                                        </FormDescription>
                                        <div className="mt-2">
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="file"
                                                    onChange={handleFileUpload}
                                                    multiple
                                                    className="hidden"
                                                    id="course-materials"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => document.getElementById("course-materials")?.click()}
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload Files
                                                </Button>
                                            </div>
                                            {files.length > 0 ? (
                                                <div className="mt-4 space-y-2">
                                                    {files.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between rounded-md border p-2">
                                                            <span className="text-sm">{file.name}</span>
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="mt-4 rounded-md border border-dashed p-8 text-center">
                                                    <p className="text-muted-foreground">No files uploaded yet</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="settings" className="space-y-6">
                                <Accordion type="single" collapsible defaultValue="enrollment">
                                    <AccordionItem value="enrollment">
                                        <AccordionTrigger>Enrollment Settings</AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-4">
                                            <FormField
                                                control={form.control}
                                                name="enrollmentType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Enrollment Type</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select enrollment type" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="open">Open (Anyone can enroll)</SelectItem>
                                                                <SelectItem value="approval">Approval Required</SelectItem>
                                                                <SelectItem value="closed">Closed (Invitation only)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormDescription>Control how students can enroll in your course</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="isVisible"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                        <FormControl>
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>Visible in Course Catalog</FormLabel>
                                                            <FormDescription>
                                                                Make this course visible in the course catalog for students to discover
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="grading">
                                        <AccordionTrigger>Grading Settings</AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-4">
                                            <FormField
                                                control={form.control}
                                                name="gradeScheme"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Grading Scheme</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select grading scheme" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                                                                <SelectItem value="letter">Letter Grade (A, B, C, D, F)</SelectItem>
                                                                <SelectItem value="pass-fail">Pass/Fail</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormDescription>Choose how students will be graded in this course</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="allowLateSubmissions"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                        <FormControl>
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>Allow Late Submissions</FormLabel>
                                                            <FormDescription>Students can submit assignments after the due date</FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="publication">
                                        <AccordionTrigger>Publication Settings</AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-4">
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Course Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="draft">Draft (not visible to students)</SelectItem>
                                                                <SelectItem value="published">Published (visible to students)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormDescription>Set the current status of this course</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </TabsContent>

                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => router.push("/instructor/dashboard")}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Course
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Tabs>
            </CardContent>
        </Card>
    )
}

