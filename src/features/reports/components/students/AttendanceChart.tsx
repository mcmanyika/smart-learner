import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface AttendanceData {
  date: string;
  attendance: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Attendance History</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="attendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#attendance)"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}