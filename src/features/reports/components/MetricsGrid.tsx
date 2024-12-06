import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReportMetric } from '../types';

interface MetricsGridProps {
  metrics: ReportMetric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </h3>
            {metric.trend && (
              <div
                className={`flex items-center ${
                  metric.trend === 'up'
                    ? 'text-green-600'
                    : metric.trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="ml-1 text-sm">
                  {metric.change && `${Math.abs(metric.change)}%`}
                </span>
              </div>
            )}
          </div>
          <p className="mt-2 text-3xl font-bold">{metric.value}</p>
        </Card>
      ))}
    </div>
  );
}