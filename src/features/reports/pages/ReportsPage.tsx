import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsService } from '../api/reports.service';
import { MetricsGrid } from '../components/MetricsGrid';
import { ReportFilters } from '../components/ReportFilters';
import { ActivityLog } from '../components/ActivityLog';
import type { ReportFilters as Filters } from '../types';

export function ReportsPage() {
  const [filters, setFilters] = useState<Filters>({
    timeframe: 'week',
  });

  const { data: metrics = [] } = useQuery({
    queryKey: ['reports', 'metrics', filters],
    queryFn: () => reportsService.getOverviewMetrics(filters),
  });

  const { data: activities = [] } = useQuery({
    queryKey: ['reports', 'activities', filters],
    queryFn: () => reportsService.getUserActivity(filters),
  });

  const handleExport = async () => {
    try {
      const blob = await reportsService.exportReport('overview', filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${filters.timeframe}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Monitor system performance and user activity
        </p>
      </div>

      <ReportFilters
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExport}
      />

      <MetricsGrid metrics={metrics} />

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ActivityLog activities={activities} />
      </div>
    </div>
  );
}