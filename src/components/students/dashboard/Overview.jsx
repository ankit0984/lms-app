import React from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";


const upcomingDeadlines = [
    { title: "DBMS Project Submission", date: "May 23, 2025" },
    { title: "OOP Assignment 4", date: "May 25, 2025" },
    { title: "AI Quiz 2", date: "May 27, 2025" },
];

const enrolledCourses = [
    "Web Development Essentials",
    "Database Management Systems",
    "Object Oriented Programming",
    "Artificial Intelligence",
];

export const Overview = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>Assignments & Enrolled Courses</CardDescription>
                </CardHeader>

                <Tabs defaultValue="assignments" className="px-6 pb-4">
                    <TabsList className="mb-4">
                        <TabsTrigger value="assignments">Due Assignments</TabsTrigger>
                        <TabsTrigger value="courses">Enrolled Courses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="assignments">
                        <ul className="space-y-3">
                            {upcomingDeadlines.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">{item.title}</span>
                                    <br />
                                    <span>{item.date}</span>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>

                    <TabsContent value="courses">
                        <ul className="list-disc pl-5 space-y-3">
                            {enrolledCourses.map((course, i) => (
                                <li key={i} className="text-sm text-muted-foreground">
                                    {course}
                                </li>
                            ))}
                        </ul>

                    </TabsContent>
                </Tabs>
            </Card>

        </>
    )
}
