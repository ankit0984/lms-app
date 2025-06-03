"use client";

import * as React from "react";
import {
    AudioWaveform,
    BarChart3,
    Bell,
    BookOpen,
    BookPlusIcon, Calendar, CalendarDays, CalendarX2Icon,
    Command,
    FileKey,
    FileQuestion,
    FileText,
    FileUp,
    GalleryVerticalEnd,
    HelpCircle,
    ListMinus,
    LucideCog,
    Settings2, User2Icon,
    UserRoundPen, Users,
} from "lucide-react";

import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/support/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardIcon, UpdateIcon } from "@radix-ui/react-icons";
import { NavMain } from "@/components/sidebar/nav-main"
import {NavProjects} from "@/components/sidebar/nav-projects";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "e-learning",
            logo: GalleryVerticalEnd,
            plan: "NIET",
        },
    ],
    Label:"Instructor Panel",
    navMain: [
        {
            title: "Management",
            url: "#",
            icon: LucideCog,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "/instructor/dashboard",
                    icons: DashboardIcon,
                },
                {
                    title: "Courses",
                    url: "/instructor/courses",
                    icons: BookOpen,
                },
                {
                    title: "Create Courses",
                    url: "/instructor/create-courses",
                    icons: BookPlusIcon,
                },
                {
                    title: "Update Courses",
                    url: "/support/userManagement/modify-password",
                    icons: UpdateIcon,
                },

            ],
        },
        {
            title: "Assignment",
            url: "#",
            icon: FileText,
            isActive: false,
            items: [
                {
                    title: "Dashboard",
                    url: "/instructor/assignments/dashboard",
                    icons: DashboardIcon,
                },
                {
                    title: "Assignments",
                    url: "/instructor/assignments",
                    icons: FileKey,
                },
                {
                    title: "Create Assignments",
                    url: "/instructor/assignments/create-assignment",
                    icons: FileQuestion,
                },

                {
                    title: "Gradings/Marks",
                    url: "/instructor/assignments/grades",
                    icons: ListMinus,
                },
            ],
        },
        {
            title: "Student Management",
            url: "#",
            icon: Users,
            isActive: false,
            items: [
                {
                    title: "Student List",
                    url: "/instructor/student-list",
                    icons: User2Icon,
                },
                {
                    title: "Enrollments",
                    url: "/instructor/enrollments",
                    icons: UserRoundPen,
                },
                {
                    title: "Update Student List",
                    url: "/support/userManagement/manage-users",
                    icons: UpdateIcon,
                },
            ],
        },
    ],
    panel:[
        {
            name:"Announcement",
            url:"/instructor/announcement",
            icon:Bell
        },
        {
            name: "Calender",
            url: "/instructor/calender",
            icon: CalendarDays,
        },
        {
            name:"Materials",
            url: "/instructor/materials",
            icon:FileUp
        },
        {
            name: "Reports",
            url: "/instructor/reports",
            icon:BarChart3
        },
        {
            name: "settings",
            url: "/instructor/settings",
            icon:Settings2
        },{
            name: "Help & support",
            url: "/instructor/support",
            icon:HelpCircle
        }
    ]
};

export function InstructorAppSidebar({ ...props }) {
    return (


    <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
        <SidebarContent>
                <NavMain label={data.Label} items={data.navMain} />
                 <NavProjects projects={data.panel} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>

    );
}
