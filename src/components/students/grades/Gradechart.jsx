"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// New hierarchical structure: departments > semesters > subjects
const courseData = {
    CSE: {
        "Sem 1": {
            CS101: {
                data: [
                    { assignment: "Assignment 1", grade: 75 },
                    { assignment: "Assignment 2", grade: 82 },
                    { assignment: "Assignment 3", grade: 68 },
                    { assignment: "Midterm", grade: 88 },
                    { assignment: "Assignment 4", grade: 90 },
                    { assignment: "Assignment 5", grade: 77 },
                    { assignment: "Project", grade: 92 },
                    { assignment: "Final Exam", grade: 85 },
                ],
                targetGrade: 85,
            },
            CS103: {
                data: [
                    { assignment: "Lab 1", grade: 80 },
                    { assignment: "Lab 2", grade: 85 },
                    { assignment: "Quiz", grade: 76 },
                    { assignment: "Assignment", grade: 82 },
                    { assignment: "Final Exam", grade: 89 },
                ],
                targetGrade: 80,
            },
        },
        "Sem 2": {
            CS102: {
                data: [
                    { assignment: "Quiz 1", grade: 65 },
                    { assignment: "Quiz 2", grade: 70 },
                    { assignment: "Assignment", grade: 74 },
                    { assignment: "Midterm", grade: 68 },
                    { assignment: "Project", grade: 78 },
                    { assignment: "Final Exam", grade: 80 },
                ],
                targetGrade: 75,
            },
            CS104: {
                data: [
                    { assignment: "Assignment 1", grade: 60 },
                    { assignment: "Assignment 2", grade: 67 },
                    { assignment: "Midterm", grade: 70 },
                    { assignment: "Assignment 3", grade: 72 },
                    { assignment: "Final Exam", grade: 76 },
                ],
                targetGrade: 72,
            },
        },
    },
    ECE: {
        "Sem 1": {
            ECE101: {
                data: [
                    { assignment: "Lab 1", grade: 80 },
                    { assignment: "Lab 2", grade: 85 },
                    { assignment: "Assignment", grade: 70 },
                    { assignment: "Midterm", grade: 78 },
                    { assignment: "Project", grade: 82 },
                    { assignment: "Final Exam", grade: 88 },
                ],
                targetGrade: 80,
            },
            ECE102: {
                data: [
                    { assignment: "Test 1", grade: 74 },
                    { assignment: "Test 2", grade: 79 },
                    { assignment: "Experiment", grade: 83 },
                    { assignment: "Midterm", grade: 77 },
                    { assignment: "Final Exam", grade: 86 },
                ],
                targetGrade: 78,
            },
        },
        "Sem 2": {
            ECE201: {
                data: [
                    { assignment: "Assignment 1", grade: 68 },
                    { assignment: "Quiz 1", grade: 72 },
                    { assignment: "Lab Work", grade: 74 },
                    { assignment: "Midterm", grade: 70 },
                    { assignment: "Final Exam", grade: 75 },
                ],
                targetGrade: 74,
            },
        },
    },
    MECH: {
        "Sem 1": {
            MECH101: {
                data: [
                    { assignment: "Assignment 1", grade: 78 },
                    { assignment: "Workshop", grade: 80 },
                    { assignment: "Midterm", grade: 76 },
                    { assignment: "Assignment 2", grade: 82 },
                    { assignment: "Final Exam", grade: 84 },
                ],
                targetGrade: 80,
            },
        },
        "Sem 2": {
            MECH201: {
                data: [
                    { assignment: "Drawing 1", grade: 70 },
                    { assignment: "Drawing 2", grade: 75 },
                    { assignment: "Viva", grade: 72 },
                    { assignment: "Midterm", grade: 78 },
                    { assignment: "Final Exam", grade: 79 },
                ],
                targetGrade: 76,
            },
        },
    },
    EEE: {
        "Sem 1": {
            EEE101: {
                data: [
                    { assignment: "Lab 1", grade: 85 },
                    { assignment: "Assignment 1", grade: 80 },
                    { assignment: "Quiz", grade: 78 },
                    { assignment: "Midterm", grade: 84 },
                    { assignment: "Final Exam", grade: 86 },
                ],
                targetGrade: 82,
            },
        },
        "Sem 2": {
            EEE201: {
                data: [
                    { assignment: "Test 1", grade: 72 },
                    { assignment: "Test 2", grade: 70 },
                    { assignment: "Assignment", grade: 68 },
                    { assignment: "Midterm", grade: 73 },
                    { assignment: "Final Exam", grade: 77 },
                ],
                targetGrade: 75,
            },
        },
    },
}

const chartConfig = {
    grade: {
        label: "Grade",
        color: "hsl(var(--chart-1))",
    },
}

export function GradeProgressChart({ selectedSemester, setSelectedSemester }) {
    const [selectedDept, setSelectedDept] = React.useState("CSE")
    const [selectedCourse, setSelectedCourse] = React.useState("CS101")
    const semesters = Object.keys(courseData[selectedDept] || {})
    const courses = Object.keys(courseData[selectedDept]?.[selectedSemester] || {})
    const selected = courseData[selectedDept]?.[selectedSemester]?.[selectedCourse]

    React.useEffect(() => {
        if (!courses.includes(selectedCourse)) {
            setSelectedCourse(courses[0])
        }
    }, [selectedDept, selectedSemester])

    const averageGrade =
        selected?.data.reduce((acc, cur) => acc + cur.grade, 0) / selected?.data.length || 0

    return (
        <Card className="@container/card">
            <CardHeader>
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Department */}
                    <Select value={selectedDept} onValueChange={(val) => {
                        setSelectedDept(val)
                        setSelectedCourse(Object.keys(courseData[val][selectedSemester])[0])
                    }}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(courseData).map((dept) => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Semester */}
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            {semesters.map((sem) => (
                                <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>


                    {/* Course */}
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((course) => (
                                <SelectItem key={course} value={course}>{course}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Avg */}
                    <div className="text-sm text-muted-foreground">
                        Avg: <span className="font-medium">{averageGrade.toFixed(1)}%</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {selected ? (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={selected.data}>
                            <defs>
                                <linearGradient id="fillGrade" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-grade)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-grade)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="assignment"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                angle={-15}
                                height={60}
                            />
                            <YAxis
                                domain={[0, 100]}
                                tickCount={6}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}%`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value, payload) =>
                                            payload?.[0]?.payload?.assignment
                                        }
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="grade"
                                type="monotone"
                                fill="url(#fillGrade)"
                                stroke="var(--color-grade)"
                                strokeWidth={2}
                                dot
                            />
                        </AreaChart>
                    </ChartContainer>
                ) : (
                    <p className="text-sm text-muted-foreground">No data available.</p>
                )}
            </CardContent>
        </Card>
    )
}
