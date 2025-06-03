import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CourseStudentManagement from "@/components/instructor/courses/course-student-management"

// export default function CourseStudentsPage({ params }) {
//     return (
//         <main className="min-h-screen p-4 md:p-8">
//             <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                     <div className="space-y-1">
//                         <div className="flex items-center gap-4">
//                             <Button variant="ghost" size="sm" asChild>
//                                 <Link href={`/subjects/${params.id}`}>
//                                     <ArrowLeft className="h-4 w-4" />
//                                     Back to Course
//                                 </Link>
//                             </Button>
//                         </div>
//                         <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
//                         <p className="text-muted-foreground">Manage student enrollments and track progress</p>
//                     </div>
//                 </div>
//                 <CourseStudentManagement courseId={params.id} />
//             </div>
//         </main>
//     )
// }

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Page({ params:paramsPromise }) {
    const params = await paramsPromise
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
                                <BreadcrumbPage>Student Management</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className='flex flex-1 flex-col gap-6 p-6 pt-6'>
                <CourseStudentManagement courseId={params.id} />
            </div>
        </SidebarInset>
    );
}


