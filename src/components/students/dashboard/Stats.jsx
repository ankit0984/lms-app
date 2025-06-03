import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    CalendarCheck,
    ClipboardCheck,
    TrendingDownIcon,
    TrendingUpIcon,
} from "lucide-react";

const semesterStats = {
    "Sem 1": {
        coursesEnrolled: 5,
        assignmentsSubmitted: 10,
        assignmentsDue: 2,
        learningMaterials: 30,
        lastCourse: "Data Structures",
        nextDue: "Maths Assignment (May 22)",
    },
    "Sem 2": {
        coursesEnrolled: 6,
        assignmentsSubmitted: 13,
        assignmentsDue: 3,
        learningMaterials: 34,
        lastCourse: "Web Development",
        nextDue: "DBMS Project (May 23)",
    },
    "Sem 3": {
        coursesEnrolled: 4,
        assignmentsSubmitted: 8,
        assignmentsDue: 4,
        learningMaterials: 28,
        lastCourse: "Machine Learning",
        nextDue: "AI Quiz (May 26)",
    },
};

export const Stats = () => {
    const [selectedSemester, setSelectedSemester] = useState("Sem 2");
    const stats = semesterStats[selectedSemester];

    return (
        <>
            {/* Semester Selector */}
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>Dashboard Overview</h2>
                <Select defaultValue='Sem 2' onValueChange={(value) => setSelectedSemester(value)}>
                    <SelectTrigger className='w-[150px]'>
                        <SelectValue placeholder='Select Semester' />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(semesterStats).map((sem) => (
                            <SelectItem key={sem} value={sem}>
                                {sem}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Stats Overview */}
            <div className='grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
                {/* Courses Enrolled */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Courses Enrolled</CardDescription>
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
                        <div className='flex gap-2 font-medium'>

                        Last added course: {stats.lastCourse}
                        </div>
                        <div className='text-muted-foreground'>Check course dashboard for materials</div>
                    </CardFooter>
                </Card>

                {/* Submitted Assignments */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Submitted Assignments</CardDescription>
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
                        {stats.assignmentsSubmitted} tasks done this semester
                        </div>
                    </CardFooter>
                </Card>

                {/* Assignments Due */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Assignments Due</CardDescription>
                        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                            {stats.assignmentsDue}
                        </CardTitle>
                        <div className='absolute right-4 top-4'>
                            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
                                <TrendingDownIcon className='size-3' />
                                Urgent
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex-col items-start gap-1 text-sm'>
                        <div className='flex gap-2 font-medium'>
                            Next Due:
                            {/*<ClipboardCheck className='size-4' />*/}
                            {stats.nextDue}
                        </div>
                        <div className='text-muted-foreground'>
                            Complete before deadline!</div>
                    </CardFooter>
                </Card>

                {/* Learning Materials */}
                <Card className='@container/card'>
                    <CardHeader className='relative'>
                        <CardDescription>Learning Materials</CardDescription>
                        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                            {stats.learningMaterials}
                        </CardTitle>
                        <div className='absolute right-4 top-4'>
                            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
                                <TrendingUpIcon className='size-3' />
                                On Track
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex-col items-start gap-1 text-sm'>
                        <div className='flex gap-2 font-medium'>
                            Estimated Study Time <CalendarCheck className='size-4' />
                        </div>
                        <div className='text-muted-foreground'>
                            ~{Math.round(stats.learningMaterials * 1.5)} hrs this semester
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};
