import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GraduationCap, TrendingUp, Award } from 'lucide-react';

const grades = [
  {
    id: 1,
    course: 'Mathematics 101',
    assignments: [
      { name: 'Quiz 1', score: 85, weight: 10 },
      { name: 'Midterm', score: 78, weight: 30 },
      { name: 'Final Project', score: 92, weight: 30 },
      { name: 'Homework', score: 88, weight: 30 },
    ],
    currentGrade: 85.7,
    trend: 'up',
  },
  {
    id: 2,
    course: 'Physics Fundamentals',
    assignments: [
      { name: 'Lab Report 1', score: 75, weight: 20 },
      { name: 'Midterm Exam', score: 82, weight: 30 },
      { name: 'Lab Report 2', score: 88, weight: 20 },
      { name: 'Final Exam', score: 90, weight: 30 },
    ],
    currentGrade: 84.5,
    trend: 'up',
  },
  {
    id: 3,
    course: 'English Literature',
    assignments: [
      { name: 'Essay 1', score: 92, weight: 25 },
      { name: 'Presentation', score: 88, weight: 25 },
      { name: 'Research Paper', score: 95, weight: 30 },
      { name: 'Class Participation', score: 90, weight: 20 },
    ],
    currentGrade: 91.6,
    trend: 'up',
  },
];

const terms = [
  { value: 'current', label: 'Current Term' },
  { value: 'fall2023', label: 'Fall 2023' },
  { value: 'spring2023', label: 'Spring 2023' },
];

function getGradeColor(grade: number) {
  if (grade >= 90) return 'text-green-600';
  if (grade >= 80) return 'text-blue-600';
  if (grade >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

export function GradesList() {
  const overallGPA = 3.7;
  const totalCredits = 45;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academic Progress</h1>
          <p className="text-muted-foreground">
            Track your grades and academic performance
          </p>
        </div>
        <Select defaultValue="current">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            {terms.map((term) => (
              <SelectItem key={term.value} value={term.value}>
                {term.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">GPA</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{overallGPA.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Credits Earned
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{totalCredits}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Academic Standing
            </h3>
          </div>
          <p className="mt-2 text-xl font-bold text-green-600">Good Standing</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Assignments</TableHead>
              <TableHead className="text-right">Current Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.course}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {grade.assignments.map((assignment, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-muted-foreground"
                      >
                        <span>{assignment.name}</span>
                        <span>{assignment.score}%</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`text-lg font-bold ${getGradeColor(
                      grade.currentGrade
                    )}`}
                  >
                    {grade.currentGrade.toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}