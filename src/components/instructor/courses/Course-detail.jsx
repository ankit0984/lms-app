"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	BookOpen,
	Calendar,
	Clock,
	FileText,
	GraduationCap,
	Pencil,
	User,
	Users,
} from "lucide-react";

// Mock course data
const mockCourseData = {
	id: "1",
	code: "CS101",
	title: "Introduction to Computer Science",
	description:
		"A comprehensive introduction to computer science principles and programming fundamentals.",
	instructor: "Dr. John Smith",
	department: "Computer Science",
	status: "active",
	startDate: "2024-01-15T00:00:00Z",
	endDate: "2024-05-15T00:00:00Z",
	maxStudents: 30,
	enrolledStudents: 25,
	prerequisites: "None",
	schedule: [
		{ day: "Monday", time: "10:00 AM - 11:30 AM", room: "Room 101" },
		{ day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "Room 101" },
	],
	materials: [
		{ name: "Syllabus.pdf", type: "PDF", size: "245 KB" },
		{ name: "Week1_Slides.pptx", type: "PPTX", size: "1.2 MB" },
		{ name: "Assignment1.doc", type: "DOC", size: "380 KB" },
	],
	students: Array.from({ length: 25 }, (_, i) => ({
		id: `${i + 1}`,
		name: `Student ${i + 1}`,
		email: `student${i + 1}@example.edu`,
		enrollmentDate: new Date(
			Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
		).toISOString(),
		progress: Math.floor(Math.random() * 100),
	})),
};

export default function CourseDetails({ courseId }) {
	const [course] = useState(mockCourseData);
	const router = useRouter();

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='space-y-1'>
					<h1 className='text-2xl font-bold tracking-tight'>{course.title}</h1>
					<p className='text-muted-foreground'>
						Course Code: {course.code} • Department: {course.department}
					</p>
				</div>
				<Button
					onClick={() =>
						router.push(`/support/courseManagement/courses/${courseId}/edit`)
					}
				>
					<Pencil className='mr-2 h-4 w-4' />
					Edit Course
				</Button>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Enrolled Students
						</CardTitle>
						<Users className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{course.enrolledStudents}</div>
						<p className='text-xs text-muted-foreground'>
							of {course.maxStudents} maximum
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Course Duration
						</CardTitle>
						<Clock className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>16</div>
						<p className='text-xs text-muted-foreground'>weeks</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Course Materials
						</CardTitle>
						<FileText className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{course.materials.length}</div>
						<p className='text-xs text-muted-foreground'>files uploaded</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Status</CardTitle>
						<BookOpen className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<Badge
							variant={course.status === "active" ? "success" : "secondary"}
							className='capitalize'
						>
							{course.status}
						</Badge>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='students'>Students</TabsTrigger>
					<TabsTrigger value='materials'>Materials</TabsTrigger>
					<TabsTrigger value='schedule'>Schedule</TabsTrigger>
				</TabsList>

				<TabsContent value='overview' className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>Course Description</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{course.description}</p>
						</CardContent>
					</Card>

					<div className='grid gap-4 md:grid-cols-2'>
						<Card>
							<CardHeader>
								<CardTitle>Course Details</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='flex items-center'>
									<User className='mr-2 h-4 w-4 text-muted-foreground' />
									<span className='font-medium'>Instructor:</span>
									<span className='ml-2'>{course.instructor}</span>
								</div>
								<div className='flex items-center'>
									<Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
									<span className='font-medium'>Duration:</span>
									<span className='ml-2'>
										{formatDate(course.startDate)} -{" "}
										{formatDate(course.endDate)}
									</span>
								</div>
								<div className='flex items-center'>
									<GraduationCap className='mr-2 h-4 w-4 text-muted-foreground' />
									<span className='font-medium'>Prerequisites:</span>
									<span className='ml-2'>{course.prerequisites}</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Enrollment Statistics</CardTitle>
								<CardDescription>
									Current enrollment status and capacity
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<div className='flex justify-between'>
										<span>Total Capacity:</span>
										<span>{course.maxStudents}</span>
									</div>
									<div className='flex justify-between'>
										<span>Enrolled:</span>
										<span>{course.enrolledStudents}</span>
									</div>
									<div className='flex justify-between'>
										<span>Available Slots:</span>
										<span>{course.maxStudents - course.enrolledStudents}</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value='students'>
					<Card>
						<CardHeader>
							<CardTitle>Enrolled Students</CardTitle>
							<CardDescription>
								List of students currently enrolled in this course
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Enrollment Date</TableHead>
										<TableHead>Progress</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{course.students.map((student) => (
										<TableRow key={student.id}>
											<TableCell>{student.name}</TableCell>
											<TableCell>{student.email}</TableCell>
											<TableCell>
												{formatDate(student.enrollmentDate)}
											</TableCell>
											<TableCell>{student.progress}%</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='materials'>
					<Card>
						<CardHeader>
							<CardTitle>Course Materials</CardTitle>
							<CardDescription>
								Access course documents and resources
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Size</TableHead>
										<TableHead className='text-right'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{course.materials.map((material, index) => (
										<TableRow key={index}>
											<TableCell>{material.name}</TableCell>
											<TableCell>{material.type}</TableCell>
											<TableCell>{material.size}</TableCell>
											<TableCell className='text-right'>
												<Button variant='ghost' size='sm'>
													Download
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='schedule'>
					<Card>
						<CardHeader>
							<CardTitle>Course Schedule</CardTitle>
							<CardDescription>
								Weekly class schedule and locations
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Day</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Location</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{course.schedule.map((session, index) => (
										<TableRow key={index}>
											<TableCell>{session.day}</TableCell>
											<TableCell>{session.time}</TableCell>
											<TableCell>{session.room}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
