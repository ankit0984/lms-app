"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Loader2,
    ArrowLeft,
    Download,
    FileText,
    CheckCircle2,
    AlertCircle,
    Clock,
    User,
    Calendar,
    BookOpen,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {toast} from "sonner";
import { Slider } from "@/components/ui/slider"

// Form schema for grading
const gradingSchema = z.object({
    grade: z.number().min(0).max(100),
    feedback: z.string().min(1, "Feedback is required"),
})

// Mock assignment data
const getMockAssignment = (id) => {
    return {
        id,
        title: "Midterm Project: Database Design",
        description: "Design a relational database schema for an e-commerce application with at least 10 tables.",
        courseCode: "CS301",
        courseName: "Database Systems",
        studentName: "Emily Johnson",
        studentId: "STU1234",
        submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        status: "submitted",
        files: [
            { name: "Database_Schema.pdf", size: "2.4 MB", type: "pdf" },
            { name: "ERD_Diagram.png", size: "1.1 MB", type: "image" },
            { name: "Implementation_Notes.docx", size: "890 KB", type: "document" },
        ],
        submissionText: `
      # Database Design for E-commerce Platform
      
      ## Overview
      This database design includes tables for users, products, categories, orders, payments, and more.
      
      ## Entity Relationship Diagram
      The ERD is attached as a separate file. It shows the relationships between all entities.
      
      ## Tables
      1. Users
      2. Products
      3. Categories
      4. Orders
      5. Order_Items
      6. Payments
      7. Addresses
      8. Reviews
      9. Inventory
      10. Wishlist
      
      ## Normalization
      All tables are in 3NF to reduce redundancy and improve data integrity.
    `,
        previousAttempts: [
            {
                id: "attempt-1",
                submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
                status: "graded",
                grade: 75,
                feedback:
                    "Good start, but your schema needs more normalization. Please revise the relationships between Orders and Products.",
            },
        ],
    }
}



export default function AssignmentGrading({ assignmentId }) {
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [assignment] = useState(getMockAssignment(assignmentId))
    const [activeTab, setActiveTab] = useState("submission")

    const form = useForm({
        resolver: zodResolver(gradingSchema),
        defaultValues: {
            grade: 0,
            feedback: "",
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            console.log("Grading data:", data)

            toast.success("Assignment Graded",{
                description: "The grade and feedback have been submitted successfully.",
            })

            router.push("/instructor/assignments")
        } catch (error) {
            toast.error("Failed to submit grade. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.push("/instructor/assignments")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Assignments
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl">{assignment.title}</CardTitle>
                                    <CardDescription>
                                        {assignment.courseCode} - {assignment.courseName}
                                    </CardDescription>
                                </div>
                                {getStatusBadge(assignment.status)}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="submission">Submission</TabsTrigger>
                                    <TabsTrigger value="files">Files</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="submission" className="mt-4">
                                    <div className="prose dark:prose-invert max-w-none">
                                        <div className="whitespace-pre-wrap">{assignment.submissionText}</div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="files" className="mt-4">
                                    <div className="space-y-4">
                                        {assignment.files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between rounded-md border p-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                                                        <FileText className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{file.name}</p>
                                                        <p className="text-sm text-muted-foreground">{file.size}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="history" className="mt-4">
                                    {assignment.previousAttempts.length > 0 ? (
                                        <div className="space-y-4">
                                            {assignment.previousAttempts.map((attempt) => (
                                                <Card key={attempt.id}>
                                                    <CardHeader className="pb-2">
                                                        <div className="flex items-center justify-between">
                                                            <CardTitle className="text-base">Previous Submission</CardTitle>
                                                            {getStatusBadge(attempt.status)}
                                                        </div>
                                                        <CardDescription>
                                                            Submitted on {format(new Date(attempt.submissionDate), "MMMM d, yyyy 'at' h:mm a")}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-medium">Grade:</span>
                                                                <span>{attempt.grade}/100</span>
                                                            </div>
                                                            <Separator />
                                                            <div>
                                                                <span className="font-medium">Feedback:</span>
                                                                <p className="mt-1 text-sm">{attempt.feedback}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-muted-foreground">No previous submissions found</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Grading</CardTitle>
                            <CardDescription>Provide a grade and feedback for this assignment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="grade"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade (out of 100)</FormLabel>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-4">
                                                        <Slider
                                                            value={[field.value]}
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            onValueChange={(value) => field.onChange(value[0])}
                                                            className="flex-1"
                                                        />
                                                        <Input
                                                            type="number"
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                            className="w-16"
                                                            min={0}
                                                            max={100}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>0</span>
                                                        <span>25</span>
                                                        <span>50</span>
                                                        <span>75</span>
                                                        <span>100</span>
                                                    </div>
                                                </div>
                                                <FormDescription>Drag the slider or enter a value to set the grade</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="feedback"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Feedback</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Provide detailed feedback on the assignment..."
                                                        className="min-h-[150px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Include specific comments on strengths and areas for improvement
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => router.push("/instructor/assignments")}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Submit Grade
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{assignment.studentName}</p>
                                        <p className="text-sm text-muted-foreground">{assignment.studentId}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Course:</span>
                                        <span className="font-medium">{assignment.courseCode}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Submission Date:</span>
                                        <span>{format(new Date(assignment.submissionDate), "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Due Date:</span>
                                        <span>{format(new Date(assignment.dueDate), "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Status:</span>
                                        <div className="flex items-center gap-1">
                                            {getStatusIcon(assignment.status)}
                                            <span>{assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push(`/instructor/grades?student=${assignment.studentId}`)}
                            >
                                View Student Grades
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{assignment.title}</p>
                                        <p className="text-sm text-muted-foreground">{assignment.courseCode}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Due Date:</span>
                                        <span>{format(new Date(assignment.dueDate), "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Course:</span>
                                        <span>{assignment.courseName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Files:</span>
                                        <span>{assignment.files.length} files</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

