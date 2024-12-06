import { GradeCard } from './GradeCard';
import type { Grade } from '../types';

interface GradesListProps {
  grades: Grade[];
}

export function GradesList({ grades }: GradesListProps) {
  if (grades.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No grades found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grades.map((grade) => (
        <GradeCard key={grade.id} grade={grade} />
      ))}
    </div>
  );
}