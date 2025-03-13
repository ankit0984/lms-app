"use client"

import React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Download, Upload, FileSpreadsheet, Check, AlertTriangle, Loader2 } from "lucide-react"

// Mock course data
const courses = [
    { id: "course1", title: "Introduction to Computer Science", code: "CS101" },
    { id: "course2", title: "Data Structures and Algorithms", code: "CS201" },
    { id: "course3", title: "Database Systems", code: "CS301" },
    { id: "course4", title: "Artificial Intelligence", code: "CS401" },
    { id: "course5", title: "Web Development Fundamentals", code: "CS150" },
]

export function BulkEnrollmentUpload() {
    const [selectedCourse, setSelectedCourse] = useState("")
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState("idle")
    const [previewData, setPreviewData] = useState([])
    const [errors, setErrors] = useState([])
    const fileInputRef = useRef(null)


    const handleFileChange = (e) => {
        const selectedFile = e.target.files && e.target.files[0]

        if (selectedFile) {
            // Check if the file is CSV or Excel
            const fileType = selectedFile.type

            if (
                fileType === "text/csv" ||
                fileType === "application/vnd.ms-excel" ||
                fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
                setFile(selectedFile)
                validateFile(selectedFile)
            } else {
                toast.error("Invalid file format",{
                    description: "Please upload a CSV or Excel file",
                })
                // Reset the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
            }
        }
    }

    const validateFile = (file) => {
        setUploadStatus("validating")
        // In a real implementation, you would parse the file here
        // For this demo, we'll simulate validation

        setTimeout(() => {
            // Simulated validation result
            const mockPreviewData = [
                { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", status: "valid" },
                { firstName: "John", lastName: "Doe", email: "john.doe@example.com", status: "valid" },
                { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", status: "valid" },
                { firstName: "Michael", lastName: "Brown", email: "invalid-email", status: "invalid" },
                { firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com", status: "valid" },
            ]

            setPreviewData(mockPreviewData)

            const validationErrors = mockPreviewData
                .filter((entry) => entry.status === "invalid")
                .map((entry) => `Invalid email format: ${entry.email}`)

            setErrors(validationErrors)

            if (validationErrors.length > 0) {
                setUploadStatus("error")
            } else {
                setUploadStatus("success")
            }
        }, 1500)
    }

    const handleUpload = async () => {
        if (!file || !selectedCourse || uploadStatus !== "success") return

        setUploading(true)
        setProgress(0)

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 10
            })
        }, 300)

        // Simulate API call
        setTimeout(() => {
            clearInterval(interval)
            setProgress(100)

            toast.success("Students enrolled successfully",{
                description: `${previewData.length} students have been enrolled in the course.`,
            })

            // Reset form
            setFile(null)
            setPreviewData([])
            setUploadStatus("idle")
            setUploading(false)

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }, 3000)
    }

    const downloadTemplate = () => {
        // In a real implementation, this would generate and download a CSV template
        // For this demo, we'll just show a toast
        toast({
            title: "Template downloaded",
            description: "The enrollment template has been downloaded.",
        })
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <Label htmlFor="course">Select Course</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger id="course">
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                    {course.code} - {course.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Button variant="outline" className="h-9 w-full mt-6" onClick={downloadTemplate}>
                            <Download className="mr-2 h-4 w-4" />
                            Template
                        </Button>
                    </div>
                    <div>
                        <Label htmlFor="file" className="sr-only">
                            Choose CSV or Excel file
                        </Label>
                        <Input
                            id="file"
                            ref={fileInputRef}
                            type="file"
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {file && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        <span className="font-medium">{file.name}</span>
                    </div>

                    {uploadStatus === "validating" && (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Validating file...</span>
                        </div>
                    )}

                    {uploadStatus === "error" && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Validation Error</AlertTitle>
                            <AlertDescription>
                                <p className="mb-2">Please fix the following errors:</p>
                                <ul className="list-disc pl-4">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {previewData.length > 0 && (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>First Name</TableHead>
                                        <TableHead>Last Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {previewData.slice(0, 5).map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.firstName}</TableCell>
                                            <TableCell>{row.lastName}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>
                                                {row.status === "valid" ? (
                                                    <div className="flex items-center text-green-600">
                                                        <Check className="mr-1 h-4 w-4" />
                                                        Valid
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center text-red-600">
                                                        <AlertTriangle className="mr-1 h-4 w-4" />
                                                        Invalid
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {uploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Uploading...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                    )}

                    <Button
                        onClick={handleUpload}
                        disabled={!selectedCourse || uploadStatus !== "success" || uploading}
                        className="w-full"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enrolling Students...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Enroll {previewData.filter((row) => row.status === "valid").length} Students
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}

