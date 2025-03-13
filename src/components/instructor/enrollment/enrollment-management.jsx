"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ManualEnrollmentForm } from "@/components/instructor/enrollment/manual-enrollment-form"
import { BulkEnrollmentUpload } from "@/components/instructor/enrollment/bulk-enrollment-upload"
import { EnrollmentRequests } from "@/components/instructor/enrollment/enrollment-requests"

export function EnrollmentManagement() {
    const [activeTab, setActiveTab] = useState("manual")

    return (
        <Tabs defaultValue="manual" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="manual">Manual Enrollment</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                <TabsTrigger value="requests">Enrollment Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Students Manually</CardTitle>
                        <CardDescription>Enroll individual students in your courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ManualEnrollmentForm />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Bulk Student Enrollment</CardTitle>
                        <CardDescription>Upload a CSV or Excel file to enroll multiple students at once</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BulkEnrollmentUpload />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Enrollment Requests</CardTitle>
                        <CardDescription>Review and approve student requests to join your courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EnrollmentRequests />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

