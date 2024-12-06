import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GradesList } from '../components/GradesList';
import { GradeStats } from '../components/GradeStats';
import { gradesService } from '../api/grades.service';

export function GradesPage() {
  const [subject, setSubject] = useState('all');
  const [type, setType] = useState('all');

  const { data: grades = [] } = useQuery({
    queryKey: ['grades'],
    queryFn: () => gradesService.getGrades(),
  });

  const { data: stats } = useQuery({
    queryKey: ['grade-stats'],
    queryFn: () => gradesService.getGradeStats(),
  });

  const filteredGrades = grades.filter((grade) => {
    if (subject !== 'all' && grade.subject !== subject) return false;
    if (type !== 'all' && grade.type !== type) return false;
    return true;
  });

  const subjects = Array.from(new Set(grades.map((g) => g.subject)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academic Performance</h1>
        <p className="text-muted-foreground">
          Track your grades and academic progress
        </p>
      </div>

      {stats && <GradeStats stats={stats} />}

      <div className="flex gap-4">
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-[180px]">
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

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="quiz">Quizzes</SelectItem>
            <SelectItem value="exam">Exams</SelectItem>
            <SelectItem value="assignment">Assignments</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <GradesList grades={filteredGrades} />
    </div>
  );
}