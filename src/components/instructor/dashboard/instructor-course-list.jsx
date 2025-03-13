"use client"

import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Users, Calendar, ArrowUpRight, FileEdit, BookOpen } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export function InstructorCourseList({ courses }) {
    const router = useRouter()

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge variant="success">Active</Badge>
            case "upcoming":
                return <Badge variant="secondary">Upcoming</Badge>
            case "completed":
                return <Badge>Completed</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Next Session</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No courses found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{course.title}</div>
                                        <div className="text-sm text-muted-foreground">{course.code}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{course.students}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex w-[100px] items-center gap-2">
                                        <Progress value={course.progress} className="h-2" />
                                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{course.nextSession}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(course.status)}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => router.push(`/courses/${course.id}`)}>
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                View course
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push(`/courses/${course.id}/edit`)}>
                                                <FileEdit className="mr-2 h-4 w-4" />
                                                Edit course
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => router.push(`/instructor/courses/${course.id}/students`)}>
                                                <Users className="mr-2 h-4 w-4" />
                                                Manage students
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push(`/courses/${course.id}/materials`)}>
                                                <ArrowUpRight className="mr-2 h-4 w-4" />
                                                Course materials
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

