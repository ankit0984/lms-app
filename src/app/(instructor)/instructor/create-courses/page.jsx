import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import InstructorCourseForm from "@/components/instructor/courses/course-form";
export const metadata = {
    title: "Create Course",
    description: "Create a new course as an instructor",
}
export default function Page() {
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
                                <BreadcrumbPage>Create Course</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Create New Course</h1>
                    <p className="text-muted-foreground">Set up a new course for your students</p>
                </div>
                <InstructorCourseForm />
            </div>
        </SidebarInset>
    );
}
