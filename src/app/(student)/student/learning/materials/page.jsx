import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {AcademicResources} from "@/components/students/learning/materials/collegeSuppliments";


export const metadata = {
title: "Learning Materials - Academic Resources",
    description: "Comprehensive learning materials and curriculum resources for all semesters.",
};
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
                                <BreadcrumbPage>
                                    Learning Materials
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                <div>
                    <h1 className="text-3xl font-bold mb-2">Academic Resources Hub</h1>
                    <p className=" text-muted-foreground max-w-2xl">
                        Access complete curriculum materials, lecture notes, presentations, and study resources
                        for all semesters and departments. Everything you need for academic excellence.
                    </p>
                </div>
                <AcademicResources/>
            </div>
        </SidebarInset>
    );
}