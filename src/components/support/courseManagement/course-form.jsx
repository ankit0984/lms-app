"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Upload, X, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const courseSchema = z.object({
	code: z.string().min(2, "Course code is required"),
	title: z.string().min(3, "Course title must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	department: z.string().min(1, "Department is required"),
	instructor: z.string().min(1, "Instructor is required"),
	startDate: z.date({
		required_error: "Start date is required",
	}),
	endDate: z.date({
		required_error: "End date is required",
	}),
	maxStudents: z.string().min(1, "Maximum students is required"),
	prerequisites: z.string(),
	status: z.enum(["draft", "active", "archived"]),
	isPublic: z.boolean().default(true),
	allowLateSubmissions: z.boolean().default(false),
	gradeScheme: z.enum(["percentage", "letter", "pass-fail"]),
});

// Mock instructors data
const mockInstructors = [
	"Dr. John Smith",
	"Prof. Sarah Johnson",
	"Dr. Michael Brown",
	"Prof. Emily Davis",
	"Dr. Robert Wilson",
];

// Mock subjects for prerequisites
const mockCourses = [
	{ code: "CS100", title: "Introduction to Programming" },
	{ code: "CS200", title: "Data Structures" },
	{ code: "MATH101", title: "Calculus I" },
	{ code: "MATH102", title: "Calculus II" },
	{ code: "PHYS101", title: "Physics I" },
];

export default function CourseForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState([]);
	const [selectedPrereqs, setSelectedPrereqs] = useState([]);
	const [schedules, setSchedules] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [customTag, setCustomTag] = useState("");
	const [thumbnailPreview, setThumbnailPreview] = useState(null);
	const [videoUrl, setVideoUrl] = useState("");
	const [videoFile, setVideoFile] = useState(null);
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			code: "",
			title: "",
			description: "",
			department: "",
			instructor: "",
			maxStudents: "30",
			prerequisites: "",
			status: "draft",
			isPublic: true,
			allowLateSubmissions: false,
			gradeScheme: "percentage",
		},
	});

	async function onSubmit(data) {
		setIsLoading(true);

		try {
			// Prepare prerequisites string from selected prereqs
			data.prerequisites = selectedPrereqs.join(", ");

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			console.log("Form data:", data);
			console.log("Files:", files);
			console.log("Schedules:", schedules);
			console.log("Tags:", selectedTags);
			console.log("Thumbnail:", thumbnailPreview ? "Uploaded" : "None");
			console.log("Video URL:", videoUrl);
			console.log("Video File:", videoFile);

			toast.success("Course Created", {
				description: "The course has been created successfully.",
			});

			router.push("/support/courseManagement/courses");
		} catch (error) {
			toast.error("Error", {
				description: "Something went wrong. Please try again.",
				// variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	}

	const handleFileUpload = (e) => {
		const uploadedFiles = Array.from(e.target.files || []);
		setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
	};

	const removeFile = (index) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const addSchedule = () => {
		setSchedules([
			...schedules,
			{ day: "Monday", startTime: "09:00", endTime: "10:30", location: "" },
		]);
	};

	const updateSchedule = (index, field, value) => {
		const updatedSchedules = [...schedules];
		updatedSchedules[index] = {
			...updatedSchedules[index],
			[field]: value,
		};
		setSchedules(updatedSchedules);
	};

	const removeSchedule = (index) => {
		setSchedules(schedules.filter((_, i) => i !== index));
	};

	const togglePrerequisite = (code) => {
		setSelectedPrereqs((current) =>
			current.includes(code)
				? current.filter((c) => c !== code)
				: [...current, code]
		);
	};

	const toggleTag = (tag) => {
		setSelectedTags((current) =>
			current.includes(tag)
				? current.filter((t) => t !== tag)
				: [...current, tag]
		);
	};

	const addCustomTag = () => {
		if (customTag.trim()) {
			setSelectedTags((current) => [...current, customTag.trim()]);
			setCustomTag("");
		}
	};

	const handleThumbnailUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setThumbnailPreview(e.target?.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleVideoUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setVideoFile(file);
			setVideoUrl(""); // Clear URL when file is uploaded
		}
	};

	return (
		<Card>
			<CardContent className='pt-6'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<Accordion type='single' collapsible defaultValue='basic-info'>
							<AccordionItem value='basic-info'>
								<AccordionTrigger>Basic Information</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<div className='space-y-6'>
										<div className='grid gap-4 md:grid-cols-2'>
											<FormField
												control={form.control}
												name='code'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Course Code</FormLabel>
														<FormControl>
															<Input placeholder='CS101' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name='title'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Course Title</FormLabel>
														<FormControl>
															<Input
																placeholder='Introduction to Computer Science'
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name='description'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															placeholder='Enter course description...'
															className='min-h-[100px]'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className='grid gap-4 md:grid-cols-2'>
											<FormField
												control={form.control}
												name='department'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Department</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder='Select department' />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value='Computer Science'>
																	Computer Science
																</SelectItem>
																<SelectItem value='Mathematics'>
																	Mathematics
																</SelectItem>
																<SelectItem value='Physics'>Physics</SelectItem>
																<SelectItem value='Chemistry'>
																	Chemistry
																</SelectItem>
																<SelectItem value='Biology'>Biology</SelectItem>
																<SelectItem value='Engineering'>
																	Engineering
																</SelectItem>
																<SelectItem value='Business'>
																	Business
																</SelectItem>
																<SelectItem value='Arts'>Arts</SelectItem>
																<SelectItem value='Humanities'>
																	Humanities
																</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name='instructor'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Instructor</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder='Select instructor' />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{mockInstructors.map((instructor) => (
																	<SelectItem
																		key={instructor}
																		value={instructor}
																	>
																		{instructor}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className='grid gap-4 md:grid-cols-2'>
											<FormField
												control={form.control}
												name='startDate'
												render={({ field }) => (
													<FormItem className='flex flex-col'>
														<FormLabel>Start Date</FormLabel>
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"w-full pl-3 text-left font-normal",
																			!field.value && "text-muted-foreground"
																		)}
																	>
																		{field.value ? (
																			format(field.value, "PPP")
																		) : (
																			<span>Pick a date</span>
																		)}
																		<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent
																className='w-auto p-0'
																align='start'
															>
																<Calendar
																	mode='single'
																	selected={field.value}
																	onSelect={field.onChange}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name='endDate'
												render={({ field }) => (
													<FormItem className='flex flex-col'>
														<FormLabel>End Date</FormLabel>
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"w-full pl-3 text-left font-normal",
																			!field.value && "text-muted-foreground"
																		)}
																	>
																		{field.value ? (
																			format(field.value, "PPP")
																		) : (
																			<span>Pick a date</span>
																		)}
																		<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent
																className='w-auto p-0'
																align='start'
															>
																<Calendar
																	mode='single'
																	selected={field.value}
																	onSelect={field.onChange}
																	disabled={(date) =>
																		date <
																		(form.getValues("startDate") || new Date())
																	}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className='space-y-4 mt-4'>
											<FormLabel>Course Thumbnail</FormLabel>
											<div className='flex items-center gap-4'>
												<div className='border rounded-md p-2 w-40 h-24 flex items-center justify-center bg-muted'>
													{thumbnailPreview ? (
														<img
															src={thumbnailPreview || "/placeholder.svg"}
															alt='Thumbnail preview'
															className='max-w-full max-h-full object-cover'
														/>
													) : (
														<span className='text-muted-foreground text-sm text-center'>
															No thumbnail
														</span>
													)}
												</div>
												<div className='flex flex-col gap-2'>
													<Input
														type='file'
														accept='image/*'
														onChange={handleThumbnailUpload}
														className='hidden'
														id='course-thumbnail'
													/>
													<Button
														type='button'
														variant='outline'
														onClick={() =>
															document
																.getElementById("course-thumbnail")
																?.click()
														}
													>
														Upload Thumbnail
													</Button>
												</div>
											</div>

											<div className='mt-4'>
												<FormLabel>Course Video</FormLabel>
												<FormDescription>
													Upload a video or provide a URL (YouTube, Vimeo, etc.)
												</FormDescription>
												<div className='grid gap-4 mt-2 md:grid-cols-2'>
													<div>
														<FormLabel className='text-xs'>Video URL</FormLabel>
														<Input
															placeholder='https://www.youtube.com/watch?v=...'
															value={videoUrl}
															onChange={(e) => setVideoUrl(e.target.value)}
														/>
													</div>
													<div>
														<FormLabel className='text-xs'>
															Or Upload Video
														</FormLabel>
														<div className='flex gap-2'>
															<Input
																type='file'
																accept='video/*'
																onChange={handleVideoUpload}
																className='hidden'
																id='course-video'
															/>
															<Button
																type='button'
																variant='outline'
																className='w-full'
																onClick={() =>
																	document
																		.getElementById("course-video")
																		?.click()
																}
															>
																{videoFile ? videoFile.name : "Select Video"}
															</Button>
															{videoFile && (
																<Button
																	type='button'
																	variant='ghost'
																	size='icon'
																	onClick={() => setVideoFile(null)}
																>
																	<X className='h-4 w-4' />
																</Button>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='tags'>
								<AccordionTrigger>Tags</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<div className='space-y-4'>
										<FormLabel>Course Tags</FormLabel>
										<FormDescription>
											Add tags to help categorize and make your course
											discoverable
										</FormDescription>
										<div className='flex flex-wrap gap-2'>
											{[
												"Beginner",
												"Intermediate",
												"Advanced",
												"Programming",
												"Design",
												"Business",
												"Science",
												"Mathematics",
											].map((tag) => (
												<div
													key={tag}
													className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
														selectedTags.includes(tag)
															? "bg-primary text-primary-foreground"
															: "bg-secondary text-secondary-foreground"
													}`}
													onClick={() => toggleTag(tag)}
												>
													{tag}
												</div>
											))}
										</div>
										<div className='flex gap-2 items-center mt-2'>
											<Input
												placeholder='Add custom tag'
												value={customTag}
												onChange={(e) => setCustomTag(e.target.value)}
												className='max-w-xs'
											/>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={addCustomTag}
												disabled={!customTag.trim()}
											>
												Add
											</Button>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='prerequisites'>
								<AccordionTrigger>Prerequisites</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<div className='space-y-4'>
										<FormLabel>Select Prerequisite Courses</FormLabel>
										<FormDescription>
											Select courses that students must complete before
											enrolling
										</FormDescription>
										<div className='rounded-md border'>
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead className='w-12'></TableHead>
														<TableHead>Course Code</TableHead>
														<TableHead>Course Title</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{mockCourses.map((course) => (
														<TableRow key={course.code}>
															<TableCell>
																<Checkbox
																	checked={selectedPrereqs.includes(
																		course.code
																	)}
																	onCheckedChange={() =>
																		togglePrerequisite(course.code)
																	}
																/>
															</TableCell>
															<TableCell>{course.code}</TableCell>
															<TableCell>{course.title}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='schedule'>
								<AccordionTrigger>Course Schedule</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<div className='space-y-4'>
										<div className='flex items-center justify-between'>
											<FormLabel>Class Sessions</FormLabel>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={addSchedule}
											>
												<Plus className='mr-2 h-4 w-4' />
												Add Session
											</Button>
										</div>
										<FormDescription>
											Set up the weekly schedule for this course
										</FormDescription>

										{schedules.length === 0 ? (
											<div className='rounded-md border border-dashed p-8 text-center'>
												<p className='text-muted-foreground'>
													No sessions added yet
												</p>
												<Button
													type='button'
													variant='outline'
													className='mt-4'
													onClick={addSchedule}
												>
													<Plus className='mr-2 h-4 w-4' />
													Add First Session
												</Button>
											</div>
										) : (
											<div className='space-y-4'>
												{schedules.map((schedule, index) => (
													<div
														key={index}
														className='grid gap-4 rounded-md border p-4 md:grid-cols-5'
													>
														<div>
															<FormLabel className='text-xs'>Day</FormLabel>
															<Select
																value={schedule.day}
																onValueChange={(value) =>
																	updateSchedule(index, "day", value)
																}
															>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value='Monday'>Monday</SelectItem>
																	<SelectItem value='Tuesday'>
																		Tuesday
																	</SelectItem>
																	<SelectItem value='Wednesday'>
																		Wednesday
																	</SelectItem>
																	<SelectItem value='Thursday'>
																		Thursday
																	</SelectItem>
																	<SelectItem value='Friday'>Friday</SelectItem>
																	<SelectItem value='Saturday'>
																		Saturday
																	</SelectItem>
																	<SelectItem value='Sunday'>Sunday</SelectItem>
																</SelectContent>
															</Select>
														</div>
														<div>
															<FormLabel className='text-xs'>
																Start Time
															</FormLabel>
															<Input
																type='time'
																value={schedule.startTime}
																onChange={(e) =>
																	updateSchedule(
																		index,
																		"startTime",
																		e.target.value
																	)
																}
															/>
														</div>
														<div>
															<FormLabel className='text-xs'>
																End Time
															</FormLabel>
															<Input
																type='time'
																value={schedule.endTime}
																onChange={(e) =>
																	updateSchedule(
																		index,
																		"endTime",
																		e.target.value
																	)
																}
															/>
														</div>
														<div className='md:col-span-2'>
															<FormLabel className='text-xs'>
																Location
															</FormLabel>
															<div className='flex gap-2'>
																<Input
																	placeholder='Room number or location'
																	value={schedule.location}
																	onChange={(e) =>
																		updateSchedule(
																			index,
																			"location",
																			e.target.value
																		)
																	}
																	className='flex-1'
																/>
																<Button
																	type='button'
																	variant='ghost'
																	size='icon'
																	onClick={() => removeSchedule(index)}
																>
																	<Trash className='h-4 w-4 text-destructive' />
																</Button>
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='materials'>
								<AccordionTrigger>Course Materials</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<div className='space-y-4'>
										<div>
											<FormLabel>Upload Materials</FormLabel>
											<FormDescription>
												Upload syllabus, lecture notes, assignments, and other
												course materials
											</FormDescription>
											<div className='mt-2'>
												<div className='flex items-center gap-4'>
													<Input
														type='file'
														onChange={handleFileUpload}
														multiple
														className='hidden'
														id='course-materials'
													/>
													<Button
														type='button'
														variant='outline'
														onClick={() =>
															document
																.getElementById("course-materials")
																?.click()
														}
													>
														<Upload className='mr-2 h-4 w-4' />
														Upload Files
													</Button>
												</div>
												{files.length > 0 ? (
													<div className='mt-4 space-y-2'>
														{files.map((file, index) => (
															<div
																key={index}
																className='flex items-center justify-between rounded-md border p-2'
															>
																<span className='text-sm'>{file.name}</span>
																<Button
																	type='button'
																	variant='ghost'
																	size='sm'
																	onClick={() => removeFile(index)}
																>
																	<X className='h-4 w-4' />
																</Button>
															</div>
														))}
													</div>
												) : (
													<div className='mt-4 rounded-md border border-dashed p-8 text-center'>
														<p className='text-muted-foreground'>
															No files uploaded yet
														</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='status'>
								<AccordionTrigger>Course Status</AccordionTrigger>
								<AccordionContent className='pt-4'>
									<FormField
										control={form.control}
										name='status'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select status' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='draft'>
															Draft (not visible to students)
														</SelectItem>
														<SelectItem value='active'>
															Active (open for enrollment)
														</SelectItem>
														<SelectItem value='archived'>
															Archived (read-only)
														</SelectItem>
													</SelectContent>
												</Select>
												<FormDescription>
													Set the current status of this course
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<div className='flex gap-4'>
							<Button
								type='button'
								variant='outline'
								onClick={() => router.push("/courses")}
							>
								Cancel
							</Button>
							<Button type='submit' disabled={isLoading}>
								{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								Create Course
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
