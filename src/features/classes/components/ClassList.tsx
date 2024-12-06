import { Class } from '../types';
import { ClassCard } from './ClassCard';

interface ClassListProps {
  classes: Class[];
  onEdit?: (class_: Class) => void;
  onDelete?: (classId: string) => void;
  showActions?: boolean;
}

export function ClassList({ classes, onEdit, onDelete, showActions }: ClassListProps) {
  if (classes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No classes found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((class_) => (
        <ClassCard
          key={class_.id}
          class_={class_}
          onEdit={() => onEdit?.(class_)}
          onDelete={() => onDelete?.(class_.id)}
          showActions={showActions}
        />
      ))}
    </div>
  );
}