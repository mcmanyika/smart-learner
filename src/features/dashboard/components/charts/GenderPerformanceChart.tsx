import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface GenderPerformanceProps {
  title: string;
  data: {
    subject: string;
    male: number;
    female: number;
  }[];
}

export function GenderPerformanceChart({ title, data }: GenderPerformanceProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" name="Male" fill="hsl(var(--chart-1))" />
            <Bar dataKey="female" name="Female" fill="hsl(var(--chart-2))" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}