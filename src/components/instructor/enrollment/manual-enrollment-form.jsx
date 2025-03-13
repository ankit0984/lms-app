"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

// Mock course data
const courses = [
    { id: "course1", title: "Introduction to Computer Science", code: "CS101" },
    { id: "course2", title: "Data Structures and Algorithms", code: "CS201" },
    { id: "course3", title: "Database Systems", code: "CS301" },
    { id: "course4", title: "Artificial Intelligence", code: "CS401" },
    { id: "course5", title: "Web Development Fundamentals", code: "CS150" },
]

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    courseId: z.string().min(1, { message: "Please select a course" }),
    role: z.enum(["student", "teaching-assistant"], {
        required_error: "Please select a role",
    }),
})

export function ManualEnrollmentForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            courseId: "",
            role: "student",
        },
    })

    async function onSubmit(values) {
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Show success toast
            toast.success("Enrollment successful",{
                description: `${values.firstName} ${values.lastName} has been enrolled in the course.`,
            })

            // Reset form
            form.reset()
        } catch (error) {
            toast.error("Enrollment failed",{
                description: "There was an error enrolling the student. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormDescription>An invitation will be sent to this email address.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="courseId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.code} - {course.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teaching-assistant">Teaching Assistant</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enrolling...
                        </>
                    ) : (
                        "Enroll Student"
                    )}
                </Button>
            </form>
        </Form>
    )
}

