import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { EVENT_TYPES } from '../config/constants';

interface EventTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function EventTypeFilter({ value, onChange }: EventTypeFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Filter events" />
      </SelectTrigger>
      <SelectContent>
        {EVENT_TYPES.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}