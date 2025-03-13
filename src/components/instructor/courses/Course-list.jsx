"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Search,
	Plus,
	MoreHorizontal,
	Pencil,
	Trash2,
	Users,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

// Mock data
const mockCourses = Array.from({ length: 50 }, (_, i) => ({
	id: `${i + 1}`,
	code: `CS${100 + i}`,
	title: `Course ${i + 1}`,
	instructor: `Instructor ${i + 1}`,
	department: ["Computer Science", "Mathematics", "Physics"][
		Math.floor(Math.random() * 3)
	],
	status: ["active", "draft", "archived"][Math.floor(Math.random() * 3)],
	enrolledStudents: Math.floor(Math.random() * 100),
	startDate: new Date(
		Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
	).toISOString(),
	endDate: new Date(
		Date.now() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000
	).toISOString(),
}));

export default function CourseList() {
	const [courses] = useState(mockCourses);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [departmentFilter, setDepartmentFilter] = useState("all");
	const [page, setPage] = useState(1);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const router = useRouter();

	const itemsPerPage = 10;
	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			statusFilter === "all" || course.status === statusFilter;
		const matchesDepartment =
			departmentFilter === "all" || course.department === departmentFilter;

		return matchesSearch && matchesStatus && matchesDepartment;
	});

	const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
	const currentCourses = filteredCourses.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);

	const handleDeleteCourse = () => {
		if (!selectedCourse) return;

		// In a real app, this would be an API call
		console.log(`Deleting course ${selectedCourse.code}`);

		toast.success("Course Deleted", {
			description: `${selectedCourse.title} has been deleted.`,
		});

		setShowDeleteDialog(false);
		setSelectedCourse(null);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<>
			<div className='flex flex-col space-y-4'>
				<div className='flex flex-col space-y-2'>
					<div>
						<h1 className='text-2xl font-bold tracking-tight'>Courses List</h1>
						<p className='text-muted-foreground'>
							Overview of all courses in the system
						</p>
					</div>
				</div>
				<div className='flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0'>
					<div className='flex-1'>
						<div className='relative'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								placeholder='Search courses...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='pl-8'
							/>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-4 md:flex md:items-center'>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className='w-full md:w-[150px]'>
								<SelectValue placeholder='Status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Status</SelectItem>
								<SelectItem value='active'>Active</SelectItem>
								<SelectItem value='draft'>Draft</SelectItem>
								<SelectItem value='archived'>Archived</SelectItem>
							</SelectContent>
						</Select>
						<Select
							value={departmentFilter}
							onValueChange={setDepartmentFilter}
						>
							<SelectTrigger className='w-full md:w-[180px]'>
								<SelectValue placeholder='Department' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Departments</SelectItem>
								<SelectItem value='Computer Science'>
									Computer Science
								</SelectItem>
								<SelectItem value='Mathematics'>Mathematics</SelectItem>
								<SelectItem value='Physics'>Physics</SelectItem>
							</SelectContent>
						</Select>
						<Button
							onClick={() =>
								router.push("/support/courseManagement/add-courses")
							}
							className='w-full md:w-auto'
						>
							<Plus className='mr-2 h-4 w-4' />
							New Course
						</Button>
					</div>
				</div>

				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Code</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Instructor</TableHead>
								<TableHead>Department</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Students</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentCourses.map((course) => (
								<TableRow key={course.id}>
									<TableCell className='font-medium'>{course.code}</TableCell>
									<TableCell>{course.title}</TableCell>
									<TableCell>{course.instructor}</TableCell>
									<TableCell>{course.department}</TableCell>
									<TableCell>
										<Badge
											variant={
												course.status === "active"
													? "success"
													: course.status === "draft"
													? "secondary"
													: "outline"
											}
										>
											{course.status}
										</Badge>
									</TableCell>
									<TableCell>{course.enrolledStudents}</TableCell>
									<TableCell>
										{formatDate(course.startDate)} -{" "}
										{formatDate(course.endDate)}
									</TableCell>
									<TableCell className='text-right'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='ghost'
													size='sm'
													className='h-8 w-8 p-0'
												>
													<span className='sr-only'>Open menu</span>
													<MoreHorizontal className='h-4 w-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem
													onClick={() =>
														router.push(
															`/support/courseManagement/courses/${course.id}`
														)
													}
												>
													<Users className='mr-2 h-4 w-4' />
													View details
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														router.push(
															`/support/courseManagement/courses/${course.id}/edit`
														)
													}
												>
													<Pencil className='mr-2 h-4 w-4' />
													Edit course
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() => {
														setSelectedCourse(course);
														setShowDeleteDialog(true);
													}}
													className='text-red-600'
												>
													<Trash2 className='mr-2 h-4 w-4' />
													Delete course
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className='flex justify-center'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href='#'
									onClick={(e) => {
										e.preventDefault();
										setPage((p) => Math.max(1, p - 1));
									}}
								/>
							</PaginationItem>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
								<PaginationItem key={p}>
									<PaginationLink
										href='#'
										isActive={page === p}
										onClick={(e) => {
											e.preventDefault();
											setPage(p);
										}}
									>
										{p}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									href='#'
									onClick={(e) => {
										e.preventDefault();
										setPage((p) => Math.min(totalPages, p + 1));
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>

			{/* Delete Course Dialog */}
			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Course</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete {selectedCourse?.title}? This
							action cannot be undone and will remove all associated data
							including student enrollments and course materials.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setShowDeleteDialog(false)}
						>
							Cancel
						</Button>
						<Button variant='destructive' onClick={handleDeleteCourse}>
							Delete Course
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
