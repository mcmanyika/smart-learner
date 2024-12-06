import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface GenderDistributionProps {
  title: string;
  data: {
    gender: string;
    count: number;
    percentage: number;
  }[];
}

const GENDER_COLORS = {
  male: 'hsl(var(--chart-1))',
  female: 'hsl(var(--chart-2))',
};

export function GenderDistributionChart({ title, data }: GenderDistributionProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="gender"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ gender, percentage }) => `${gender} (${percentage}%)`}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.gender}
                  fill={GENDER_COLORS[entry.gender.toLowerCase() as keyof typeof GENDER_COLORS]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} (${data.find(d => d.gender.toLowerCase() === name.toLowerCase())?.percentage}%)`,
                'Count'
              ]}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}