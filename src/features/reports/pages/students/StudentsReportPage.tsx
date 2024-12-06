import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentPerformanceChart } from '../../components/students/StudentPerformanceChart';
import { AttendanceChart } from '../../components/students/AttendanceChart';
import { StudentsList } from '../../components/students/StudentsList';
import { mockStudents } from '@/lib/mock-data/students';

const mockPerformanceData = [
  { subject: 'Mathematics', score: 85, average: 78 },
  { subject: 'Science', score: 92, average: 82 },
  { subject: 'English', score: 78, average: 75 },
  { subject: 'History', score: 88, average: 80 },
];

const mockAttendanceData = [
  { date: 'Jan', attendance: 95 },
  { date: 'Feb', attendance: 98 },
  { date: 'Mar', attendance: 92 },
  { date: 'Apr', attendance: 96 },
  { date: 'May', attendance: 94 },
];

export function StudentsReportPage() {
  const [timeframe, setTimeframe] = useState('month');
  const [grade, setGrade] = useState('all');

  const handleExport = () => {
    // Implementation for exporting report
    console.log('Exporting report...');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Students Report</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of student performance and attendance
        </p>
      </div>

      <div className="flex gap-4">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="9">9th Grade</SelectItem>
            <SelectItem value="10">10th Grade</SelectItem>
            <SelectItem value="11">11th Grade</SelectItem>
            <SelectItem value="12">12th Grade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <StudentPerformanceChart data={mockPerformanceData} />
        <AttendanceChart data={mockAttendanceData} />
      </div>

      <Card className="p-6">
        <StudentsList students={mockStudents} onExport={handleExport} />
      </Card>
    </div>
  );
}