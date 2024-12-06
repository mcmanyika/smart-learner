import { Card } from '@/components/ui/card';
import { Users, UserCheck, GraduationCap, Clock } from 'lucide-react';
import type { StudentStats } from '../types';

interface StudentStatsProps {
  stats: StudentStats;
}

export function StudentStats({ stats }: StudentStatsProps) {
  const metrics = [
    {
      label: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
    },
    {
      label: 'Active Students',
      value: stats.activeStudents,
      icon: UserCheck,
    },
    {
      label: 'Average Grade',
      value: `${stats.averageGrade}%`,
      icon: GraduationCap,
    },
    {
      label: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center space-x-2">
            <metric.icon className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{metric.value}</p>
        </Card>
      ))}
    </div>
  );
}