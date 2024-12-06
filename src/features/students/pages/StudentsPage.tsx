import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/features/auth/store';
import { StudentList } from '../components/StudentList';
import { StudentForm } from '../components/StudentForm';
import { StudentStats } from '../components/StudentStats';
import { useToast } from '@/hooks/use-toast';
import { studentsService } from '../api/students.service';
import type { Student, StudentFilters } from '../types';

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    studentId: 'STU001',
    gender: 'male',
    dateOfBirth: '2006-05-15',
    grade: '10th',
    parentName: 'Jane Doe',
    parentEmail: 'jane.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    enrollmentDate: '2022-09-01',
    status: 'active',
  },
  // Add more mock students as needed
];

const mockStats = {
  totalStudents: 1234,
  activeStudents: 1180,
  averageGrade: 85,
  attendanceRate: 92,
};

export function StudentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [filters, setFilters] = useState<StudentFilters>({});
  const { toast } = useToast();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const handleCreateOrUpdate = async (data: Partial<Student>) => {
    try {
      if (selectedStudent) {
        await studentsService.updateStudent(selectedStudent.id, data);
        toast({
          title: 'Success',
          description: 'Student updated successfully',
        });
      } else {
        await studentsService.createStudent(data);
        toast({
          title: 'Success',
          description: 'Student added successfully',
        });
      }
      setIsDialogOpen(false);
      setSelectedStudent(undefined);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  const handleDelete = async (studentId: string) => {
    try {
      await studentsService.deleteStudent(studentId);
      toast({
        title: 'Success',
        description: 'Student deleted successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete student',
      });
    }
  };

  const filteredStudents = mockStudents.filter(student => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.studentId.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }
    if (filters.grade && filters.grade !== 'all' && student.grade !== filters.grade) return false;
    if (filters.status && filters.status !== 'all' && student.status !== filters.status) return false;
    if (filters.gender && filters.gender !== 'all' && student.gender !== filters.gender) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage and monitor student information' : 'View student information'}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        )}
      </div>

      <StudentStats stats={mockStats} />

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>
        <Select
          value={filters.grade || 'all'}
          onValueChange={(grade) => setFilters({ ...filters, grade })}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="9th">9th Grade</SelectItem>
            <SelectItem value="10th">10th Grade</SelectItem>
            <SelectItem value="11th">11th Grade</SelectItem>
            <SelectItem value="12th">12th Grade</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.status || 'all'}
          onValueChange={(status) => setFilters({ ...filters, status })}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="graduated">Graduated</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.gender || 'all'}
          onValueChange={(gender) => setFilters({ ...filters, gender })}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <StudentList
        students={filteredStudents}
        onEdit={isAdmin ? (student) => {
          setSelectedStudent(student);
          setIsDialogOpen(true);
        } : undefined}
        onDelete={isAdmin ? handleDelete : undefined}
      />

      {isAdmin && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedStudent ? 'Edit Student' : 'Add New Student'}
              </DialogTitle>
            </DialogHeader>
            <StudentForm
              defaultValues={selectedStudent}
              onSubmit={handleCreateOrUpdate}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}