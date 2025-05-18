// "use client";

// import * as React from "react";
// import {
// 	AudioWaveform,
// 	BarChart3,
// 	Bell,
// 	BookOpen,
// 	BookPlusIcon,
// 	Calendar,
// 	CalendarDays,
// 	CalendarX2Icon,
// 	Command,
// 	FileKey,
// 	FileQuestion,
// 	FileText,
// 	FileUp,
// 	GalleryVerticalEnd,
// 	HelpCircle,
// 	ListMinus,
// 	LucideCog,
// 	LucideHome,
// 	Settings2,
// 	User2Icon,
// 	UserRoundPen,
// 	Users,
// } from "lucide-react";
// import { NavUser } from "@/components/sidebar/nav-user";
// import { TeamSwitcher } from "@/components/support/team-switcher";
// import {
// 	Sidebar,
// 	SidebarContent,
// 	SidebarFooter,
// 	SidebarHeader,
// 	SidebarRail,
// } from "@/components/ui/sidebar";
// import { DashboardIcon, UpdateIcon } from "@radix-ui/react-icons";
// import { NavMain } from "@/components/sidebar/nav-main";
// import { NavProjects } from "@/components/sidebar/nav-projects";

// // This is sample data.
// const data = {
// 	user: {
// 		name: "shadcn",
// 		email: "m@example.com",
// 		avatar: "/avatars/shadcn.jpg",
// 	},
// 	teams: [
// 		{
// 			name: "e-learning",
// 			logo: GalleryVerticalEnd,
// 			plan: "NIET",
// 		},
// 	],
// 	Label: "Student Panel",
// 	navMain: [
// 		{
// 			title: "Home",
// 			url: "/student/dashboard",
// 			icon: LucideHome,
// 			isActive: true,
// 			items: [
// 				{
// 					title: "Dashboard",
// 					url: "/instructor/dashboard",
// 					icons: DashboardIcon,
// 				},
// 				{
// 					title: "Assignments",
// 					url: "/instructor/courses",
// 					icons: BookOpen,
// 				},
// 				{
// 					title: "Dashboard",
// 					url: "/instructor/create-courses",
// 					icons: BookPlusIcon,
// 				},
// 				{
// 					title: "Update Courses",
// 					url: "/support/userManagement/modify-password",
// 					icons: UpdateIcon,
// 				},
// 			],
// 		},
// 		{
// 			title: "Assignment",
// 			url: "#",
// 			icon: FileText,
// 			isActive: false,
// 			items: [
// 				{
// 					title: "Dashboard",
// 					url: "/support/courseManagement/dashboard",
// 					icons: DashboardIcon,
// 				},
// 				{
// 					title: "Assignments",
// 					url: "/instructor/assignments",
// 					icons: FileKey,
// 				},
// 				{
// 					title: "Create Assignments",
// 					url: "/support/userManagement/manage-users",
// 					icons: FileQuestion,
// 				},

// 				{
// 					title: "Gradings/Marks",
// 					url: "/instructor/assignments/grades",
// 					icons: ListMinus,
// 				},
// 			],
// 		},
// 		{
// 			title: "Student Management",
// 			url: "#",
// 			icon: Users,
// 			isActive: false,
// 			items: [
// 				{
// 					title: "Student List",
// 					url: "/instructor/student-list",
// 					icons: User2Icon,
// 				},
// 				{
// 					title: "Enrollments",
// 					url: "/instructor/enrollments",
// 					icons: UserRoundPen,
// 				},
// 				{
// 					title: "Update Student List",
// 					url: "/support/userManagement/manage-users",
// 					icons: UpdateIcon,
// 				},
// 			],
// 		},
// 	],
// 	panel: [
// 		{
// 			name: "Announcement",
// 			url: "/instructor/announcement",
// 			icon: Bell,
// 		},
// 		{
// 			name: "Calender",
// 			url: "/instructor/calender",
// 			icon: CalendarDays,
// 		},
// 		{
// 			name: "Materials",
// 			url: "/instructor/materials",
// 			icon: FileUp,
// 		},
// 		{
// 			name: "Reports",
// 			url: "/instructor/reports",
// 			icon: BarChart3,
// 		},
// 		{
// 			name: "settings",
// 			url: "/instructor/settings",
// 			icon: Settings2,
// 		},
// 		{
// 			name: "Help & support",
// 			url: "/instructor/support",
// 			icon: HelpCircle,
// 		},
// 	],
// };

// export function StudentAppSidebar({ ...props }) {
// 	return (
// 		<Sidebar collapsible='icon' {...props}>
// 			<SidebarHeader>
// 				<TeamSwitcher teams={data.teams} />
// 			</SidebarHeader>
// 			<SidebarContent>
// 				<NavMain label={data.Label} items={data.navMain} />
// 				<NavProjects projects={data.panel} />
// 			</SidebarContent>
// 			<SidebarFooter>
// 				<NavUser user={data.user} />
// 			</SidebarFooter>
// 			<SidebarRail />
// 		</Sidebar>
// 	);
// }
"use client";

import * as React from "react";
import {
	BarChart3,
	Bell,
	BookOpen,
	CalendarDays,
	FileText,
	FileUp,
	GalleryVerticalEnd,
	HelpCircle,
	LucideHome,
	Settings2,
	ListMinus,
	VideoIcon,
	MessageSquareText,
	BookMarked,
	ClipboardCheck,
	FolderKanban,
	FolderOpenDot,
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
import { DashboardIcon } from "@radix-ui/react-icons";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";

const data = {
	user: {
		name: "John Doe",
		email: "student@example.com",
		avatar: "/avatars/student.jpg",
	},
	teams: [
		{
			name: "e-learning",
			logo: GalleryVerticalEnd,
			plan: "NIET",
		},
	],
	Label: "Student Panel",
	navMain: [
		{
			title: "Dashboard",
			url: "/student/dashboard",
			icon: LucideHome,
			isActive: true,
			items: [
				{
					title: "Overview",
					url: "/student/dashboard",
					icons: DashboardIcon,
				},
				{
					title: "Grades",
					url: "/student/dashboard/grades",
					icons: ListMinus,
				},
				{
					title: "Progress Report",
					url: "/student/dashboard/reports",
					icons: BarChart3,
				},
			],
		},
		{
			title: "Courses",
			url: "#",
			icon: BookMarked,
			isActive: false,
			items: [
				{
					title: "My Courses",
					url: "/student/courses",
					icons: BookOpen,
				},
				{
					title: "Recent Courses",
					url: "/student/courses/recent",
					icons: FolderOpenDot,
				},
				{
					title: "Assigned Courses",
					url: "/student/courses/assigned",
					icons: FolderKanban,
				},
			],
		},
		{
			title: "Assignments",
			url: "#",
			icon: ClipboardCheck,
			isActive: false,
			items: [
				{
					title: "Active Assignments",
					url: "/student/assignments/active",
					icons: FileText,
				},
				{
					title: "Submitted Assignments",
					url: "/student/assignments/submitted",
					icons: FileUp,
				},
				{
					title: "Assignment Grades",
					url: "/student/assignments/grades",
					icons: ListMinus,
				},
			],
		},
		{
			title: "Learning",
			url: "#",
			icon: BookOpen,
			isActive: false,
			items: [
				{
					title: "Materials",
					url: "/student/learning/materials",
					icons: FileUp,
				},
				{
					title: "DevTube",
					url: "/student/learning/devtube",
					icons: VideoIcon,
				},
				{
					title: "Community",
					url: "/student/learning/community",
					icons: MessageSquareText,
				},
			],
		},
	],
	panel: [
		{
			name: "Announcements",
			url: "/student/announcements",
			icon: Bell,
		},
		{
			name: "Calendar",
			url: "/student/calendar",
			icon: CalendarDays,
		},
		{
			name: "Help & Support",
			url: "/student/support",
			icon: HelpCircle,
		},
		{
			name: "Settings",
			url: "/student/settings",
			icon: Settings2,
		},
	],
};

export function StudentAppSidebar({ ...props }) {
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
