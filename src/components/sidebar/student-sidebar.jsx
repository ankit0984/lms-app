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
				},
				{
					title: "Grades",
					url: "/student/dashboard/grades",
				},
				{
					title: "Subjects",
					url: "/student/dashboard/subjects",
				}
			],
		},

		{
			title: "Assignments",
			url: "#",
			icon: ClipboardCheck,
			isActive: false,
			items: [
				{
					title: "Overview",
					url: "/student/assignments/overview",
					icons: FileText,
				},
				{
					title: "Active Assignments",
					url: "/student/assignments/active-assignments",
					icons: FileText,
				},
				{
					title: "Submitted Assignments",
					url: "/student/assignments/submitted-assignments",
					icons: FileUp,
				},
				// {
				// 	title: "Assignment Grades",
				// 	url: "/student/assignments/grades",
				// 	icons: ListMinus,
				// },
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
		{
			title: "Courses",
			url: "#",
			icon: BookMarked,
			isActive: false,
			items: [
				{
					title: "My Courses",
					url: "/student/courses/my-courses",
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
