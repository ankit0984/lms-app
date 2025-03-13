"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for student performance
const generateMockData = () => {
    const courses = ["CS101", "CS201", "CS301"]

    return courses.map((course) => {
        return {
            course,
            A: Math.floor(Math.random() * 15) + 5,
            B: Math.floor(Math.random() * 20) + 10,
            C: Math.floor(Math.random() * 15) + 5,
            D: Math.floor(Math.random() * 10) + 1,
            F: Math.floor(Math.random() * 5),
        }
    })
}

const generateAssignmentData = () => {
    const assignments = ["Assignment 1", "Assignment 2", "Assignment 3", "Midterm", "Final Project"]

    return assignments.map((assignment) => {
        return {
            assignment,
            "Average Score": Math.floor(Math.random() * 20) + 70,
            "Highest Score": Math.floor(Math.random() * 10) + 90,
            "Lowest Score": Math.floor(Math.random() * 20) + 50,
        }
    })
}

const generateAttendanceData = () => {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]

    return weeks.map((week) => {
        const attendance = Math.floor(Math.random() * 15) + 80
        return {
            week,
            "Attendance Rate": attendance,
            "Participation Rate": Math.min(attendance, Math.floor(Math.random() * 20) + 70),
        }
    })
}

export function StudentPerformanceChart() {
    const [isMounted, setIsMounted] = useState(false)
    const [chartType, setChartType] = useState("grades")
    const [gradeData, setGradeData] = useState([])
    const [assignmentData, setAssignmentData] = useState([])
    const [attendanceData, setAttendanceData] = useState([])

    useEffect(() => {
        setIsMounted(true)
        setGradeData(generateMockData())
        setAssignmentData(generateAssignmentData())
        setAttendanceData(generateAttendanceData())
    }, [])

    if (!isMounted) {
        return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="grades">Grade Distribution</SelectItem>
                        <SelectItem value="assignments">Assignment Scores</SelectItem>
                        <SelectItem value="attendance">Attendance & Participation</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {chartType === "grades" && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gradeData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="course" type="category" width={80} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="A" fill="#4f46e5" name="A Grade" />
                                    <Bar dataKey="B" fill="#10b981" name="B Grade" />
                                    <Bar dataKey="C" fill="#f59e0b" name="C Grade" />
                                    <Bar dataKey="D" fill="#f97316" name="D Grade" />
                                    <Bar dataKey="F" fill="#ef4444" name="F Grade" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}

            {chartType === "assignments" && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={assignmentData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="assignment" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Average Score" fill="#4f46e5" />
                                    <Bar dataKey="Highest Score" fill="#10b981" />
                                    <Bar dataKey="Lowest Score" fill="#ef4444" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}

            {chartType === "attendance" && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Attendance Rate" fill="#4f46e5" />
                                    <Bar dataKey="Participation Rate" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

