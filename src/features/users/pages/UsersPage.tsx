import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserTable } from '../components/UserTable';
import { UserDialog } from '../components/UserDialog';
import { useUsers } from '../hooks/useUsers';
import { UserFilters } from '../types';

export function UsersPage() {
  const [filters, setFilters] = useState<UserFilters>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: users = [], isLoading } = useUsers(filters);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage users and their roles in the system
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search users..."
          className="max-w-xs"
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <Select
          value={filters.role || 'all'}
          onValueChange={(role) => setFilters({ ...filters, role: role === 'all' ? undefined : role })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="parent">Parent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UserTable users={users} isLoading={isLoading} />
      
      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}