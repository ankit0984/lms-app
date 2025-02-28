"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserTable } from "./user-table";
import { Search, RefreshCw } from "lucide-react";

export default function UserManagementDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockUsers = [
    {
      id: "1",
      username: "johndoe",
      email: "john.doe@example.com",
      role: "student",
      suspended: false,
      lastLogin: "2023-12-01T10:30:00Z",
      coursesEnrolled: 3,
      createdAt: "2023-01-15T08:00:00Z",
    },
    {
      id: "2",
      username: "janedoe",
      email: "jane.doe@example.com",
      role: "instructor",
      suspended: false,
      lastLogin: "2023-12-05T14:20:00Z",
      coursesEnrolled: 0,
      createdAt: "2023-02-10T09:15:00Z",
    },
    {
      id: "3",
      username: "adminuser",
      email: "admin@example.com",
      role: "admin",
      suspended: false,
      lastLogin: "2023-12-07T11:45:00Z",
      coursesEnrolled: 0,
      createdAt: "2022-11-05T10:00:00Z",
    },
    {
      id: "4",
      username: "suspendeduser",
      email: "suspended@example.com",
      role: "student",
      suspended: true,
      lastLogin: "2023-11-20T16:30:00Z",
      coursesEnrolled: 2,
      createdAt: "2023-03-20T11:30:00Z",
    },
    {
      id: "5",
      username: "teacherjones",
      email: "jones@example.com",
      role: "instructor",
      suspended: false,
      lastLogin: "2023-12-06T09:10:00Z",
      coursesEnrolled: 0,
      createdAt: "2023-01-25T13:45:00Z",
    },
    {
      id: "6",
      username: "newstudent",
      email: "newstudent@example.com",
      role: "student",
      suspended: false,
      lastLogin: null,
      coursesEnrolled: 1,
      createdAt: "2023-12-01T15:20:00Z",
    },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !user.suspended) ||
      (statusFilter === "suspended" && user.suspended);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage LMS users, view details, and modify user status.
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by username or email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <UserTable users={filteredUsers} onRefresh={handleRefresh} />
    </div>
  );
}
