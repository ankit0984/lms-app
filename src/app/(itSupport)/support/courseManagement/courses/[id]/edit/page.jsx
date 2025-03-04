import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { notFound } from "next/navigation";
import EditCourseForm from "../../../../../../../components/support/courseManagement/edit-course-form";

// Mock function to fetch course data
async function getCourse(id) {
	// In a real app, this would fetch from an API or database
	const mockCourses = [
		{
			id: "1",
			code: "CS101",
			title: "Introduction to Computer Science",
			description:
				"A comprehensive introduction to computer science principles and programming fundamentals.",
			department: "Computer Science",
			instructor: "Dr. John Smith",
			startDate: "2024-01-15T00:00:00Z",
			endDate: "2024-05-15T00:00:00Z",
			maxStudents: "30",
			prerequisites: "CS100, MATH101",
			status: "active",
			tags: ["Programming", "Beginner", "Computer Science"],
			thumbnailUrl: "/placeholder.svg?height=200&width=300",
			videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			materials: [
				{ name: "Syllabus.pdf", type: "PDF", size: "245 KB" },
				{ name: "Week1_Slides.pptx", type: "PPTX", size: "1.2 MB" },
			],
			schedule: [
				{
					day: "Monday",
					startTime: "10:00",
					endTime: "11:30",
					location: "Room 101",
				},
				{
					day: "Wednesday",
					startTime: "10:00",
					endTime: "11:30",
					location: "Room 101",
				},
			],
		},
		{
			id: "2",
			code: "MATH201",
			title: "Advanced Calculus",
			description:
				"An in-depth exploration of calculus concepts including limits, derivatives, and integrals.",
			department: "Mathematics",
			instructor: "Prof. Sarah Johnson",
			startDate: "2024-02-01T00:00:00Z",
			endDate: "2024-06-01T00:00:00Z",
			maxStudents: "25",
			prerequisites: "MATH101, MATH102",
			status: "draft",
			tags: ["Mathematics", "Advanced"],
			thumbnailUrl: "/placeholder.svg?height=200&width=300",
			videoUrl: "",
			materials: [],
			schedule: [
				{
					day: "Tuesday",
					startTime: "13:00",
					endTime: "14:30",
					location: "Room 203",
				},
				{
					day: "Thursday",
					startTime: "13:00",
					endTime: "14:30",
					location: "Room 203",
				},
			],
		},
	];

	const course = mockCourses.find((course) => course.id === id);

	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	return course;
}

export default async function Page({ params: paramsPromise }) {
	const params = await paramsPromise; // by doing this coz of this error occur in console Error: Route "/support/courseManagement/courses/[id]/edit" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
	const course = await getCourse(params.id);

	if (!course) {
		notFound();
	}
	return (
		<SidebarInset>
			<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
				<div className='flex items-center gap-2 px-4'>
					<SidebarTrigger className='-ml-1' />
					<Separator
						orientation='vertical'
						className='mr-2 data-[orientation=vertical]:h-4'
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Courses List</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
				<div className='space-y-2'>
					<h1 className='text-2xl font-bold tracking-tight'>Edit Course</h1>
					<p className='text-muted-foreground'>
						Update course information or delete the course
					</p>
				</div>
				<EditCourseForm course={course} />
				{/* <CourseList courseId={params.id} /> */}
			</div>
		</SidebarInset>
	);
}

// import EditCourseForm from "@/components/edit-course-form"

// export default async function EditCoursePage({ params }) {
//   const course = await getCourse(params.id)

//   if (!course) {
//     notFound()
//   }

//   return (
//     <main className="min-h-screen p-4 md:p-8">
//       <div className="mx-auto max-w-4xl space-y-6">
//         <div className="space-y-2">
//           <h1 className="text-2xl font-bold tracking-tight">Edit Course</h1>
//           <p className="text-muted-foreground">Update course information or delete the course</p>
//         </div>
//         <EditCourseForm course={course} />
//       </div>
//     </main>
//   )
// }
