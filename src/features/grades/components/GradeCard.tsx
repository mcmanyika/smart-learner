import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/date';
import type { Grade } from '../types';

interface GradeCardProps {
  grade: Grade;
}

function getGradeColor(percentage: number) {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 80) return 'text-blue-600';
  if (percentage >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

export function GradeCard({ grade }: GradeCardProps) {
  const percentage = (grade.score / grade.maxScore) * 100;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{grade.subject}</h3>
          <p className="text-sm text-muted-foreground capitalize">{grade.type}</p>
        </div>
        <div className={`text-2xl font-bold ${getGradeColor(percentage)}`}>
          {percentage.toFixed(1)}%
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Score:</span>
          <span>{grade.score} / {grade.maxScore}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Date:</span>
          <span>{formatDate(grade.date)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Teacher:</span>
          <span>{grade.teacherName}</span>
        </div>
      </div>

      {grade.feedback && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">{grade.feedback}</p>
        </div>
      )}
    </Card>
  );
}