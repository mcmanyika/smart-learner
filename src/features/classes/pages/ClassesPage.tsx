import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/features/auth/store';
import { ClassList } from '../components/ClassList';
import { ClassForm } from '../components/ClassForm';
import { useClasses } from '../hooks/useClasses';
import { classesService } from '../api/classes.service';
import { useToast } from '@/hooks/use-toast';
import type { Class } from '../types';

export function ClassesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class>();
  const [filters, setFilters] = useState({ search: '', subject: 'all' });
  const { user } = useAuth();
  const { data: classes = [], refetch } = useClasses();
  const { toast } = useToast();

  const filteredClasses = classes.filter(class_ => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        class_.name.toLowerCase().includes(searchTerm) ||
        class_.subject.toLowerCase().includes(searchTerm) ||
        class_.teacherName?.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }
    if (filters.subject !== 'all' && class_.subject !== filters.subject) {
      return false;
    }
    return true;
  });

  const subjects = Array.from(new Set(classes.map(c => c.subject)));

  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (selectedClass) {
        await classesService.updateClass(selectedClass.id, data);
        toast({
          title: 'Success',
          description: 'Class updated successfully',
        });
      } else {
        await classesService.createClass(data);
        toast({
          title: 'Success',
          description: 'Class created successfully',
        });
      }
      refetch();
      setIsDialogOpen(false);
      setSelectedClass(undefined);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  const handleDelete = async (classId: string) => {
    try {
      await classesService.deleteClass(classId);
      toast({
        title: 'Success',
        description: 'Class deleted successfully',
      });
      refetch();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete class',
      });
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Classes</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all classes in the system
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Class
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>
        <Select
          value={filters.subject}
          onValueChange={(subject) => setFilters({ ...filters, subject })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ClassList
        classes={filteredClasses}
        onEdit={isAdmin ? (class_) => {
          setSelectedClass(class_);
          setIsDialogOpen(true);
        } : undefined}
        onDelete={isAdmin ? handleDelete : undefined}
        showActions={isAdmin}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedClass ? 'Edit Class' : 'Create New Class'}
            </DialogTitle>
          </DialogHeader>
          <ClassForm
            defaultValues={selectedClass}
            onSubmit={handleCreateOrUpdate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}