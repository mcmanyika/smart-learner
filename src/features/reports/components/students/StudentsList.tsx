import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { formatDate } from '@/lib/utils/date';
import type { Student } from '@/features/students/types';

interface StudentsListProps {
  students: Student[];
  onExport: () => void;
}

export function StudentsList({ students, onExport }: StudentsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Students Overview</h3>
        <Button variant="outline" onClick={onExport}>
          <FileDown className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Enrollment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <div>
                  <p>{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
              </TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    student.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : student.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                `}>
                  {student.status}
                </div>
              </TableCell>
              <TableCell>{formatDate(student.enrollmentDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}