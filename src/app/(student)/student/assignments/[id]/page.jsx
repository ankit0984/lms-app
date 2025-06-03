'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileClock, Calendar, Upload, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Using the same sample data as activeAssignments.jsx
const studentAssignmentData = [
    {
        semester: 1,
        assignments: [
            {
                id: "cs201-intro-prog",
                title: "Introduction to Programming",
                subjectCode: "CS201",
                description: "Write a program to manage a student record system in C.",
                dueDate: "2025-06-04",
                submissionDate: "2025-06-03",
                status: "submitted",
                grade: "A"
            },
            {
                id: "ma201-math",
                title: "Mathematics Assignment",
                subjectCode: "MA201",
                description: "Solve problems on probability and statistics.",
                dueDate: "2025-06-02",
                submissionDate: "2025-06-01",
                status: "submitted",
                grade: "B"
            },
            {
                id: "ec201-logic",
                title: "Digital Logic Design",
                subjectCode: "EC201",
                description: "Design combinational circuits using K-maps.",
                dueDate: "2025-06-06",
                submissionDate: "2025-06-05",
                status: "submitted",
                grade: "A-"
            },
            {
                id: "evs201-env",
                title: "Environmental Science",
                subjectCode: "EVS201",
                description: "Write a report on sustainable energy practices.",
                dueDate: "2025-06-09",
                submissionDate: null,
                status: "pending",
                grade: null
            }
        ]
    },
    {
        semester: 4,
        assignments: [
            {
                id: "cs401-db",
                title: "Database Design",
                subjectCode: "CS401",
                description: "Design an ER diagram for a university database.",
                dueDate: "2025-06-05",
                submissionDate: "2025-06-04",
                status: "submitted",
                grade: "A"
            },
            {
                id: "cs402-networks",
                title: "Computer Networks Assignment",
                subjectCode: "CS402",
                description: "Explain TCP/IP model with real-world examples.",
                dueDate: "2025-06-08",
                submissionDate: "2025-06-07",
                status: "submitted",
                grade: "B+"
            },
            {
                id: "cs403-os",
                title: "Operating Systems Project",
                subjectCode: "CS403",
                description: "Simulate CPU scheduling algorithms in C++.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                status: "submitted",
                grade: "A-"
            },
            {
                id: "cs404-se",
                title: "Software Engineering",
                subjectCode: "CS404",
                description: "Prepare a software requirements specification document.",
                dueDate: "2025-06-15",
                submissionDate: "2025-06-14",
                status: "submitted",
                grade: "B"
            },
            {
                id: "cs405-java",
                title: "Java Lab Assignment",
                subjectCode: "CS405",
                description: "Build a small Java GUI application using Swing.",
                dueDate: "2025-06-20",
                submissionDate: null,
                status: "pending",
                grade: null
            }
        ]
    },
    {
        semester: 6,
        assignments: [
            {
                id: "ds601-ml",
                title: "Machine Learning Assignment 1",
                subjectCode: "DS601",
                description: "Implement linear regression using Python and sklearn.",
                dueDate: "2025-06-10",
                submissionDate: "2025-06-09",
                status: "submitted",
                grade: "A+"
            },
            {
                id: "ds602-viz",
                title: "Data Visualization Project",
                subjectCode: "DS602",
                description: "Create an interactive dashboard using Plotly.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                status: "submitted",
                grade: "A"
            },
            {
                id: "ds603-dl",
                title: "Deep Learning Basics",
                subjectCode: "DS603",
                description: "Explain CNN architectures with examples.",
                dueDate: "2025-06-14",
                submissionDate: "2025-06-13",
                status: "submitted",
                grade: "B+"
            },
            {
                id: "ds604-bigdata",
                title: "Big Data Analytics",
                subjectCode: "DS604",
                description: "Use Apache Spark to process a dataset.",
                dueDate: "2025-06-16",
                submissionDate: "2025-06-15",
                status: "submitted",
                grade: "A-"
            },
            {
                id: "ds605-nlp",
                title: "NLP Task",
                subjectCode: "DS605",
                description: "Perform sentiment analysis on Twitter data.",
                dueDate: "2025-06-18",
                submissionDate: "2025-06-17",
                status: "submitted",
                grade: "B+"
            }
        ]
    }
];

export default function AssignmentDetailsPage() {
    const params = useParams();
    const [assignment, setAssignment] = useState(null);
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Calculate days left
    const now = new Date();
    const daysLeft = assignment ? 
        Math.ceil((new Date(assignment.dueDate) - now) / (1000 * 60 * 60 * 24)) : 0;

    useEffect(() => {
        // Find the assignment with the matching ID
        const allAssignments = studentAssignmentData.flatMap(semester => semester.assignments);
        const foundAssignment = allAssignments.find(a => a.id === params.id);
        
        if (foundAssignment) {
            setAssignment(foundAssignment);
        }
    }, [params.id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        // Check if file is a PDF
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setSubmitError(null);
        } else {
            setFile(null);
            setSubmitError("Please upload a PDF file");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!file) {
            setSubmitError("Please select a file to upload");
            return;
        }
        
        setIsSubmitting(true);
        
        // Simulate API call with timeout
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            
            // Reset after 3 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);
        }, 1500);
    };

    if (!assignment) {
        return (
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator
                            orientation='vertical'
                            className='mr-2 data-[orientation=vertical]:h-4'
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href="/student/assignments/active-assignments">Active Assignments</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Assignment Details</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    <Card className="rounded-2xl shadow-md p-6 text-center">
                        <div className="flex flex-col items-center justify-center py-10">
                            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Assignment Not Found</h3>
                            <p className="text-muted-foreground">The assignment you're looking for doesn't exist or has been removed.</p>
                            <Button className="mt-4" asChild>
                                <Link href="/student/assignments/active-assignments">Back to Active Assignments</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </SidebarInset>
        );
    }

    return (
        <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator
                        orientation='vertical'
                        className='mr-2 data-[orientation=vertical]:h-4'
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/student/assignments/active-assignments">Active Assignments</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{assignment.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                {/* Assignment Details Card */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                                <p className="text-muted-foreground">{assignment.subjectCode}</p>
                            </div>
                            {assignment.status === "pending" && (
                                <Badge variant={daysLeft <= 3 ? "destructive" : "outline"} className={`capitalize ${daysLeft <= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                                </Badge>
                            )}
                            {assignment.status === "submitted" && (
                                <Badge className="bg-green-100 text-green-800">Submitted</Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p>{assignment.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2">Due Date</h3>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span>{assignment.dueDate}</span>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-2">Status</h3>
                                <div className="flex items-center gap-2">
                                    <FileClock className="w-4 h-4 text-muted-foreground" />
                                    <span className="capitalize">{assignment.status}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Assignment PDF */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Assignment PDF</h3>
                            <Card className="bg-gray-50">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <p className="font-medium">{assignment.title} - Instructions.pdf</p>
                                            <p className="text-sm text-muted-foreground">Click to download the assignment instructions</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Submission Form */}
                        {assignment.status === "pending" && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-4">Submit Your Assignment</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="assignment-file">Upload PDF File</Label>
                                            <div className="mt-2">
                                                <Input 
                                                    id="assignment-file" 
                                                    type="file" 
                                                    accept=".pdf" 
                                                    onChange={handleFileChange}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                            {submitError && (
                                                <p className="text-sm text-red-500 mt-1">{submitError}</p>
                                            )}
                                            {file && (
                                                <p className="text-sm text-green-600 mt-1">
                                                    Selected file: {file.name}
                                                </p>
                                            )}
                                        </div>
                                        
                                        <Button 
                                            type="submit" 
                                            className="w-full" 
                                            disabled={!file || isSubmitting || submitSuccess}
                                        >
                                            {isSubmitting ? (
                                                "Uploading..."
                                            ) : submitSuccess ? (
                                                "Submitted Successfully!"
                                            ) : (
                                                <>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Submit Assignment
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                        
                        {/* Submission Details (if already submitted) */}
                        {assignment.status === "submitted" && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">Submission Details</h3>
                                <Card className="bg-green-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-8 h-8 text-green-600" />
                                            <div>
                                                <p className="font-medium">Submitted on {assignment.submissionDate}</p>
                                                <p className="text-sm text-muted-foreground">Your submission has been received</p>
                                            </div>
                                        </div>
                                        {assignment.grade && (
                                            <div className="mt-4">
                                                <h4 className="font-semibold">Grade</h4>
                                                <Badge className={`mt-1 ${
                                                    assignment.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                                                    assignment.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {assignment.grade}
                                                </Badge>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                            <Link href="/student/assignments/active-assignments">Back to Assignments</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </SidebarInset>
    );
}