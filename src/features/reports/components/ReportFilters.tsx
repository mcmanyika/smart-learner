import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { ReportFilters } from '../types';

interface ReportFiltersProps {
  filters: ReportFilters;
  onFilterChange: (filters: ReportFilters) => void;
  onExport: () => void;
}

export function ReportFilters({
  filters,
  onFilterChange,
  onExport,
}: ReportFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <Select
        value={filters.timeframe}
        onValueChange={(timeframe) => onFilterChange({ ...filters, timeframe })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
    </div>
  );
}