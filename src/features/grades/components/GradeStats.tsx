import { Card } from '@/components/ui/card';
import { GraduationCap, Award, TrendingUp, Book } from 'lucide-react';
import type { GradeStats } from '../types';

interface GradeStatsProps {
  stats: GradeStats;
}

export function GradeStats({ stats }: GradeStatsProps) {
  const metrics = [
    {
      label: 'Overall GPA',
      value: stats.overallGPA.toFixed(2),
      icon: GraduationCap,
    },
    {
      label: 'Credits Earned',
      value: stats.totalCredits,
      icon: Book,
    },
    {
      label: 'Highest Grade',
      value: `${stats.highestGrade}%`,
      icon: Award,
    },
    {
      label: 'Lowest Grade',
      value: `${stats.lowestGrade}%`,
      icon: TrendingUp,
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