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

interface StudentPerformanceData {
  subject: string;
  score: number;
  average: number;
}

interface StudentPerformanceChartProps {
  data: StudentPerformanceData[];
}

export function StudentPerformanceChart({ data }: StudentPerformanceChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Academic Performance by Subject</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" name="Student Score" fill="hsl(var(--primary))" />
            <Bar dataKey="average" name="Class Average" fill="hsl(var(--muted-foreground))" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}