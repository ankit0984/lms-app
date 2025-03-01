"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  MoreHorizontal,
  AlertTriangle,
  Trash2,
  Ban,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.edu`,
  role: ["student", "instructor", "admin"][Math.floor(Math.random() * 3)],
  status: Math.random() > 0.2 ? "active" : "suspended",
  suspendedUntil:
    Math.random() > 0.8
      ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
      : null,
  lastLogin: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(),
  createdAt: new Date(
    Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
  ).toISOString(),
}));

export default function UserManagementTable() {
  const [users] = useState(mockUsers);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState("");
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [suspensionDate, setSuspensionDate] = useState();
  const [customDuration, setCustomDuration] = useState("");
  const [suspensionDuration, setSuspensionDuration] = useState("1-day");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleSuspendUser = () => {
    if (!selectedUser) return;

    let suspendUntil = new Date();
    if (suspensionDuration === "custom" && suspensionDate) {
      suspendUntil = suspensionDate;
    } else {
      const days = Number.parseInt(suspensionDuration.split("-")[0]);
      suspendUntil.setDate(suspendUntil.getDate() + days);
    }

    // In a real app, this would be an API call
    console.log(
      `Suspending user ${selectedUser.username} until ${suspendUntil}`
    );

    toast.success(`User Suspended`, {
      description: `${selectedUser.username} has been suspended until ${format(
        suspendUntil,
        "PPP"
      )}`,
    });

    setShowSuspendDialog(false);
    setSelectedUser(null);
    setSuspensionDate(undefined);
    setSuspensionDuration("1-day");
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    // In a real app, this would be an API call
    console.log(`Deleting user ${selectedUser.username}`);

    toast.error(`User Deleted`, {
      description: `${selectedUser.username} has been permanently removed from the system.`,
    });

    setShowDeleteDialog(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PPp");
  };

  return (
    <>
      <Toaster />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.role === "admin"
                        ? "default"
                        : user.role === "instructor"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={
                        user.status === "active" ? "success" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                    {user.suspendedUntil && (
                      <span className="text-xs text-muted-foreground">
                        Until {format(user.suspendedUntil, "PP")}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDate(user.lastLogin)}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user);
                          setShowSuspendDialog(true);
                        }}
                        className="text-yellow-600"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend user
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteDialog(true);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={page === p}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Suspend User Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-yellow-600" />
              Suspend User
            </DialogTitle>
            <DialogDescription>
              Choose how long you want to suspend {selectedUser?.username}. They
              will not be able to access the system during this period.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Suspension Duration</label>
              <Select
                value={suspensionDuration}
                onValueChange={setSuspensionDuration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-day">1 Day</SelectItem>
                  <SelectItem value="3-days">3 Days</SelectItem>
                  <SelectItem value="7-days">1 Week</SelectItem>
                  <SelectItem value="30-days">30 Days</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {suspensionDuration === "custom" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !suspensionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {suspensionDate
                        ? format(suspensionDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={suspensionDate}
                      onSelect={setSuspensionDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuspendDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSuspendUser}
              disabled={suspensionDuration === "custom" && !suspensionDate}
            >
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.username}? This
              action cannot be undone and will permanently remove the user and
              all associated data from the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
