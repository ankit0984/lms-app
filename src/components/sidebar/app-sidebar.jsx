"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
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
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
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
          url: "/support/users",
          icons: UserCircleIcon,
        },
        {
          title: "Create User",
          url: "/support/create-user",
          icons: UserRoundPlusIcon,
        },
        {
          title: "Remove User",
          url: "/support/manage-users",
          icons: UserRoundMinusIcon,
        },
        {
          title: "Update User",
          url: "/support/modify-password",
          icons: UpdateIcon,
        },
      ],
    },
    {
      title: "Course Management",
      url: "#",
      icon: LibraryIcon,
      items: [
        {
          title: "Dashboard",
          url: "/support/courseManagement/dashboard",
          icons: DashboardIcon,
        },
        {
          title: "Users",
          url: "/support/users",
          icons: UserCircleIcon,
        },
        {
          title: "Create User",
          url: "#",
          icons: UserRoundPlusIcon,
        },
        {
          title: "Remove User",
          url: "#",
          icons: UserRoundMinusIcon,
        },
        {
          title: "Update User",
          url: "#",
          icons: UpdateIcon,
        },
      ],
    },
    {
      title: "College Management",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
