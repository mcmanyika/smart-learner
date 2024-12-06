import { Card } from '@/components/ui/card';
import { useAuth } from '@/features/auth/store';
import { AreaChart } from '../components/charts/AreaChart';
import { BarChart } from '../components/charts/BarChart';
import { PieChart } from '../components/charts/PieChart';
import { GenderDistributionChart } from '../components/charts/GenderDistributionChart';
import { GenderPerformanceChart } from '../components/charts/GenderPerformanceChart';

const attendanceData = [
  { name: 'Mon', value: 92 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 95 },
  { name: 'Thu', value: 90 },
  { name: 'Fri', value: 85 },
];

const gradeDistribution = [
  { name: 'A', value: 35 },
  { name: 'B', value: 45 },
  { name: 'C', value: 15 },
  { name: 'D', value: 5 },
];

const classPerformance = [
  { name: 'Math', score: 85 },
  { name: 'Science', score: 78 },
  { name: 'English', score: 92 },
  { name: 'History', score: 88 },
];

const genderDistribution = [
  { gender: 'Male', count: 650, percentage: 54 },
  { gender: 'Female', count: 550, percentage: 46 },
];

const genderPerformance = [
  { subject: 'Math', male: 82, female: 85 },
  { subject: 'Science', male: 78, female: 80 },
  { subject: 'English', male: 88, female: 92 },
  { subject: 'History', male: 85, female: 87 },
];

export function DashboardOverview() {
  const { user } = useAuth();

  const stats = {
    student: [
      { label: 'Courses', value: '6' },
      { label: 'Assignments Due', value: '3' },
      { label: 'Average Grade', value: '85%' },
      { label: 'Attendance', value: '92%' },
    ],
    teacher: [
      { label: 'Classes', value: '5' },
      { label: 'Students', value: '120' },
      { label: 'Assignments', value: '15' },
      { label: 'Average Class Performance', value: '78%' },
    ],
    parent: [
      { label: 'Children', value: '2' },
      { label: 'Upcoming Events', value: '4' },
      { label: 'Messages', value: '3' },
      { label: 'Average Grades', value: '88%' },
    ],
    admin: [
      { label: 'Total Students', value: '1,234' },
      { label: 'Total Teachers', value: '45' },
      { label: 'Active Classes', value: '68' },
      { label: 'System Usage', value: '92%' },
    ],
  };

  const currentStats = stats[user?.role || 'student'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening in your educational world.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </h3>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AreaChart
          title="Weekly Attendance"
          data={attendanceData}
          dataKey="value"
        />
        <PieChart
          title="Grade Distribution"
          data={gradeDistribution}
          dataKey="value"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GenderDistributionChart
          title="Student Gender Distribution"
          data={genderDistribution}
        />
        <GenderPerformanceChart
          title="Performance by Gender"
          data={genderPerformance}
        />
      </div>

      <BarChart
        title="Class Performance"
        data={classPerformance}
        dataKey="score"
      />
    </div>
  );
}