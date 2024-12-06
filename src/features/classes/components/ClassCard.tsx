import { Clock, Users, MapPin, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Class } from '../types';

interface ClassCardProps {
  class_: Class;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export function ClassCard({ class_, onEdit, onDelete, showActions }: ClassCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{class_.name}</h3>
          <p className="text-sm text-muted-foreground">{class_.subject}</p>
        </div>
        {showActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {class_.description && (
        <p className="mt-2 text-sm text-gray-600">{class_.description}</p>
      )}

      <div className="mt-4 space-y-2">
        {class_.schedule && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 h-4 w-4" />
            {class_.schedule}
          </div>
        )}
        {class_.room && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4" />
            Room {class_.room}
          </div>
        )}
        {class_.capacity && (
          <div className="flex items-center text-sm text-gray-600">
            <Users className="mr-2 h-4 w-4" />
            Capacity: {class_.capacity} students
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="text-sm">
          <p className="font-medium">{class_.teacherName}</p>
          <p className="text-muted-foreground">{class_.teacherEmail}</p>
        </div>
      </div>
    </Card>
  );
}