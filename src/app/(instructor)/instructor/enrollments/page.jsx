import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {EnrollmentManagement} from "@/components/instructor/enrollment/enrollment-management";

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
                                <BreadcrumbPage>Student Enrollment</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Student Enrollment</h1>
                    <p className="text-muted-foreground">Add students to your courses individually or in bulk</p>
                </div>
                <EnrollmentManagement />
            </div>
        </SidebarInset>
    );
}
