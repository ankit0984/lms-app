"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	BookPlusIcon,
	Bot,
	Command,
	GalleryVerticalEnd,
	GraduationCap,
	LibraryIcon,
	LucideCog,
	LucideCommand,
	Settings2,
	SquareTerminal,
	UserCircleIcon,
	UserRoundMinusIcon,
	UserRoundPlusIcon,
} from "lucide-react";

import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/support/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardIcon, DashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { NavMain } from "./nav-main";

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
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	Label:"Support Panel",
	navMain: [
		{
			title: "User Management",
			url: "#",
			icon: LucideCog,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/support/dashboard",
					icons: DashboardIcon,
				},
				{
					title: "Users",
					url: "/support/userManagement/users",
					icons: UserCircleIcon,
				},
				{
					title: "Create User",
					url: "/support/userManagement/create-user",
					icons: UserRoundPlusIcon,
				},
				{
					title: "Remove User",
					url: "/support/userManagement/manage-users",
					icons: UserRoundMinusIcon,
				},
				{
					title: "Update User",
					url: "/support/userManagement/modify-password",
					icons: UpdateIcon,
				},
			],
		},
		{
			title: "Course Management",
			url: "#",
			icon: LibraryIcon,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/support/courseManagement/dashboard",
					icons: DashboardIcon,
				},
				{
					title: "Courses",
					url: "/support/courseManagement/courses",
					icons: BookOpen,
				},
				{
					title: "add Courses",
					url: "/support/courseManagement/add-courses",
					icons: BookPlusIcon,
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Dashboard",
			url: "/support",
			icon: DashboardIcon,
		},
		{
			name: "Users",
			url: "/support/users",
			icon: UserCircleIcon,
		},
		{
			name: "Create User",
			url: "#",
			icon: UserRoundPlusIcon,
		},
		{
			name: "Remove User",
			url: "#",
			icon: UserRoundMinusIcon,
		},
		{
			name: "Update User",
			url: "#",
			icon: UpdateIcon,
		},
		{
			name: "Settings",
			url: "#",
			icon: Settings2,
		},
	],
};

export function AppSidebar({ ...props }) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain label={data.Label} items={data.navMain} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
