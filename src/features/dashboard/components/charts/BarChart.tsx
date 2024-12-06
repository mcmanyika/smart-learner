import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface BarChartProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
}

export function BarChart({
  title,
  data,
  dataKey,
  xAxisKey = 'name',
  color = 'var(--primary)',
  height = 300,
}: BarChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}