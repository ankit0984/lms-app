import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function RecentUsersTable({ users }) {
  const formatDate = () => {
    return new Date().toLocaleDateString();
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "admin":
        return "default";
      case "instructor":
        return "secondary";
      case "student":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.suspended ? (
                  <Badge variant="destructive">Suspended</Badge>
                ) : (
                  <Badge variant="success">Active</Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
