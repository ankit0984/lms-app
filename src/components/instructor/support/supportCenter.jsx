"use client"

import React from "react"

import { useState } from "react"
import { Search, Book, MessageSquare, FileText, ExternalLink, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SupportCenter() {
    const [searchQuery, setSearchQuery] = useState("")
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
    })

    const handleContactFormChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value,
        })
    }

    const handleCategoryChange = (value) => {
        setContactForm({
            ...contactForm,
            category: value,
        })
    }

    const handleSubmitContactForm = (e) => {
        e.preventDefault()
        // In a real app, this would submit the form to a backend
        console.log("Contact form submitted:", contactForm)
        // Reset form
        setContactForm({
            name: "",
            email: "",
            subject: "",
            category: "",
            message: "",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search help articles..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Tabs defaultValue="faq" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                    <TabsTrigger value="guides">Guides</TabsTrigger>
                    <TabsTrigger value="contact">Contact Support</TabsTrigger>
                </TabsList>

                <TabsContent value="faq" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <CardDescription>Find answers to common questions about the instructor platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>How do I create a new course?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground">
                                            To create a new course, navigate to the Courses section in the instructor panel and click on the
                                            "Create Course" button. Fill in the required information such as course title, code, description,
                                            and schedule. Once you've completed the form, click "Create" to set up your new course.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>How do I enroll students in my course?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground">
                                            There are several ways to enroll students in your course:
                                            <ol className="list-decimal pl-5 pt-2">
                                                <li>
                                                    Navigate to the "Enrollment" section and use the "Manual Enrollment" option to add students
                                                    individually.
                                                </li>
                                                <li>Use the "Bulk Enrollment" option to upload a CSV file with student information.</li>
                                                <li>Generate and share an enrollment code that students can use to self-enroll.</li>
                                                <li>Approve enrollment requests from students who have requested to join your course.</li>
                                            </ol>
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>How do I create and grade assignments?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground">
                                            To create an assignment, go to the "Assignments" section and click "Create Assignment." Fill in
                                            the details including title, instructions, due date, and point value. You can attach files or
                                            links as needed.
                                            <br />
                                            <br />
                                            To grade submitted assignments, navigate to the "Assignments" section, select the assignment you
                                            want to grade, and click on "View Submissions." You can then review each student's work, provide
                                            feedback, and assign grades.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>How do I track student attendance?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground">
                                            To track attendance, go to the "Attendance" section in the instructor panel. You can create a new
                                            attendance session for a specific date and course. Mark each student as present, absent, or late,
                                            and add notes if needed. You can also view attendance reports and trends over time.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>How do I use the AI features for assignment creation?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground">
                                            Our platform integrates with Google's Gemini AI to help you create assignments. When creating a
                                            new assignment, you'll see an "AI Assist" button. Click this to access features like:
                                            <ul className="list-disc pl-5 pt-2">
                                                <li>Generating assignment prompts based on your course topics</li>
                                                <li>Creating rubrics for assessment</li>
                                                <li>Suggesting feedback templates for common student mistakes</li>
                                                <li>Generating sample solutions for reference</li>
                                            </ul>
                                            You can edit and refine the AI-generated content before finalizing your assignment.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Book className="mr-2 h-4 w-4" />
                                View All Help Articles
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="guides" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Instructor Guides</CardTitle>
                            <CardDescription>Step-by-step guides to help you use the platform effectively</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">Getting Started Guide</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">
                                            A comprehensive guide to setting up your instructor account and creating your first course.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Read Guide
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">Course Management</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">
                                            Learn how to effectively manage your courses, modules, and learning materials.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Read Guide
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">Assessment Strategies</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">
                                            Discover best practices for creating and grading assignments, quizzes, and exams.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Read Guide
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">Student Engagement</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">
                                            Strategies and tools to increase student participation and engagement in your courses.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Read Guide
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">AI Integration Guide</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">
                                            How to leverage AI features to enhance your teaching and assessment workflows.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Read Guide
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base">Analytics & Reporting</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">
                                            Understanding and using the analytics tools to track student performance and course effectiveness.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Read Guide
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Knowledge Base
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Support</CardTitle>
                            <CardDescription>Get help from our support team</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitContactForm} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" value={contactForm.name} onChange={handleContactFormChange} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={contactForm.email}
                                            onChange={handleContactFormChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={contactForm.subject}
                                            onChange={handleContactFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={contactForm.category} onValueChange={handleCategoryChange}>
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="technical">Technical Issue</SelectItem>
                                                <SelectItem value="account">Account Management</SelectItem>
                                                <SelectItem value="course">Course Management</SelectItem>
                                                <SelectItem value="billing">Billing & Payments</SelectItem>
                                                <SelectItem value="feature">Feature Request</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={contactForm.message}
                                        onChange={handleContactFormChange}
                                        rows={5}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Submit Support Request
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start space-y-4">
                            <div className="text-sm">
                                <h3 className="font-medium">Other ways to get help:</h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>support@learningplatform.edu</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>+1 (800) 123-4567</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

