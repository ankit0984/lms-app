'use client'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
    BookOpenCheck,
    CalendarCheck,
    ClipboardCheck,
    GraduationCap,
    TrendingDownIcon,
    TrendingUpIcon
} from "lucide-react";



const courses = [
    {
        id: 1,
        title: "Data Structures and Algorithms",
        code: "CS201",
        department: "Computer Science",
        semester: "Semester 1",
        instructor: "Dr. Aditi Sharma",
        credits: 4,
        status: "Active",
    },
    {
        id: 2,
        title: "Database Management Systems",
        code: "CS202",
        department: "Computer Science",
        semester: "Semester 1",
        instructor: "Prof. Rajeev Ranjan",
        credits: 3,
        status: "Active",
    },
    {
        id: 3,
        title: "Operating Systems",
        code: "CS301",
        department: "Computer Science",
        semester: "Semester 2",
        instructor: "Dr. Sneha Kulkarni",
        credits: 4,
        status: "Active",
    },
    {
        id: 4,
        title: "Web Development",
        code: "CS302",
        department: "Information Technology",
        semester: "Semester 2",
        instructor: "Mr. Kunal Mehta",
        credits: 3,
        status: "Active",
    },
    {
        id: 5,
        title: "Artificial Intelligence",
        code: "CS401",
        department: "Computer Science",
        semester: "Semester 3",
        instructor: "Dr. Neha Verma",
        credits: 4,
        status: "Active",
    },
    {
        id: 6,
        title: "Cloud Computing",
        code: "CS402",
        department: "Information Technology",
        semester: "Semester 3",
        instructor: "Prof. Harish Patel",
        credits: 3,
        status: "Active",
    },
    {
        id: 7,
        title: "Software Engineering",
        code: "CS403",
        department: "Computer Science",
        semester: "Semester 3",
        instructor: "Dr. Meera Menon",
        credits: 3,
        status: "Inactive",
    },
    {
        id: 8,
        title: "Computer Networks",
        code: "CS404",
        department: "Computer Science",
        semester: "Semester 2",
        instructor: "Mr. Anand Bhosale",
        credits: 3,
        status: "Active",
    },
];
const dashboardContent = [

]
const stats = {
    recentCoursesCount: 3,
    coursesEnrolled: 6,
    assignmentsSubmitted: 18,
    lastCourse: 'Data Structures'
}


export const Dashboard = () => {
    const [selectedSemester, setSelectedSemester] = useState("Semester 2");
    const [filteredCourses, setFilteredCourses] = useState([]);

    // Get unique semesters for the dropdown
    const uniqueSemesters = [...new Set(courses.map(course => course.semester))];

    // Filter subjects based on selected semester
    useEffect(() => {
        const filtered = courses.filter(course => course.semester === selectedSemester);
        setFilteredCourses(filtered);
    }, [selectedSemester]);

    return (
        <>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>Dashboard Overview</h2>
                <Select defaultValue={selectedSemester} onValueChange={(value) => setSelectedSemester(value)}>
                    <SelectTrigger className='w-[150px]'>
                        <SelectValue placeholder='Select Semester' />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueSemesters.map(semester => (
                            <SelectItem key={semester} value={semester}>
                                {semester}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/*<div className='grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>*/}
            {/*    /!* Recent Courses *!/*/}
            {/*    <Card className='@container/card'>*/}
            {/*        <CardHeader className='relative'>*/}
            {/*            <CardDescription>Recent Courses</CardDescription>*/}
            {/*            <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>*/}
            {/*                {stats.coursesEnrolled}*/}
            {/*            </CardTitle>*/}
            {/*            <div className='absolute right-4 top-4'>*/}
            {/*                <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>*/}
            {/*                    <TrendingUpIcon className='size-3' />*/}
            {/*                    Active*/}
            {/*                </Badge>*/}
            {/*            </div>*/}
            {/*        </CardHeader>*/}
            {/*        <CardFooter className='flex-col items-start gap-1 text-sm'>*/}
            {/*            <div className='flex gap-2 font-medium'>*/}

            {/*                Last added course: {stats.lastCourse}*/}
            {/*            </div>*/}
            {/*            <div className='text-muted-foreground'>Check course dashboard for materials</div>*/}
            {/*        </CardFooter>*/}
            {/*    </Card>*/}
            {/*    /!* Course Enrolled *!/*/}
            {/*    <Card className='@container/card'>*/}
            {/*        <CardHeader className='relative'>*/}
            {/*            <CardDescription>Courses Enrolled</CardDescription>*/}
            {/*            <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>*/}
            {/*                {stats.coursesEnrolled}*/}
            {/*            </CardTitle>*/}
            {/*            <div className='absolute right-4 top-4'>*/}
            {/*                <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>*/}
            {/*                    <TrendingUpIcon className='size-3' />*/}
            {/*                    Active*/}
            {/*                </Badge>*/}
            {/*            </div>*/}
            {/*        </CardHeader>*/}
            {/*        <CardFooter className='flex-col items-start gap-1 text-sm'>*/}
            {/*            <div className='flex gap-2 font-medium'>*/}

            {/*                Last added course: {stats.lastCourse}*/}
            {/*            </div>*/}
            {/*            <div className='text-muted-foreground'>Check course dashboard for materials</div>*/}
            {/*        </CardFooter>*/}
            {/*    </Card>*/}

            {/*    /!* Assigned Courses *!/*/}
            {/*    <Card className='@container/card'>*/}
            {/*        <CardHeader className='relative'>*/}
            {/*            <CardDescription>Total Assigned Courses</CardDescription>*/}
            {/*            <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>*/}
            {/*                {stats.assignmentsSubmitted}*/}
            {/*            </CardTitle>*/}
            {/*            <div className='absolute right-4 top-4'>*/}
            {/*                <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>*/}
            {/*                    <TrendingDownIcon className='size-3' />*/}
            {/*                    Complete*/}
            {/*                </Badge>*/}
            {/*            </div>*/}
            {/*        </CardHeader>*/}
            {/*        <CardFooter className='flex-col items-start gap-1 text-sm'>*/}
            {/*            <div className='flex gap-2 font-medium'>*/}
            {/*                Keep submitting <ClipboardCheck className='size-4' />*/}
            {/*            </div>*/}
            {/*            <div className='text-muted-foreground'>*/}
            {/*                {stats.assignmentsSubmitted} tasks done this semester*/}
            {/*            </div>*/}
            {/*        </CardFooter>*/}
            {/*    </Card>*/}
            {/*</div>*/}

            <div className='grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4'>

                {/* Recent Courses */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Total Recent Courses</CardDescription>
                        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                            {stats.recentCoursesCount}
                        </CardTitle>
                        <div className='absolute right-4 top-4'>
                            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
                                <TrendingUpIcon className='size-3' />
                                New
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex-col items-start gap-1 text-sm'>
                        <div className='font-medium'>
                            Last added: <span className='text-primary'>{stats.lastCourse}</span>
                        </div>
                        <div className='text-muted-foreground'>
                            Visit dashboard to explore them
                        </div>
                    </CardFooter>
                </Card>

                {/* Courses Enrolled */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Courses You're Enrolled In</CardDescription>
                        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                            {stats.coursesEnrolled}
                        </CardTitle>
                        <div className='absolute right-4 top-4'>
                            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
                                <TrendingUpIcon className='size-3' />
                                Active
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex-col items-start gap-1 text-sm'>
                        <div className='font-medium'>
                            Last enrolled: <span className='text-primary'>{stats.lastCourse}</span>
                        </div>
                        <div className='text-muted-foreground'>
                            View enrolled course materials
                        </div>
                    </CardFooter>
                </Card>

                {/* Assigned Courses (Tasks/Assignments) */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Assignments Submitted</CardDescription>
                        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                            {stats.assignmentsSubmitted}
                        </CardTitle>
                        <div className='absolute right-4 top-4'>
                            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
                                <TrendingDownIcon className='size-3' />
                                Complete
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex-col items-start gap-1 text-sm'>
                        <div className='flex gap-2 font-medium'>
                            Keep submitting <ClipboardCheck className='size-4' />
                        </div>
                        <div className='text-muted-foreground'>
                            {stats.assignmentsSubmitted} tasks submitted this semester
                        </div>
                    </CardFooter>
                </Card>

            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.code}</p>
                        <div className="mt-2">
                            <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                            <p><span className="font-medium">Department:</span> {course.department}</p>
                            <p><span className="font-medium">Credits:</span> {course.credits}</p>
                            <p><span className="font-medium">Status:</span>
                                <span className={course.status === "Active" ? "text-green-500" : "text-red-500"}>
                                    {course.status}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
