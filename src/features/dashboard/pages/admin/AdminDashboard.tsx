import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  GraduationCap,
  BookOpen,
  AlertCircle,
  TrendingUp,
  Bell,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const stats = [
  {
    label: 'Total Students',
    value: '1,234',
    icon: Users,
    trend: '+12%',
    trendUp: true,
  },
  {
    label: 'Total Teachers',
    value: '45',
    icon: GraduationCap,
    trend: '+3%',
    trendUp: true,
  },
  {
    label: 'Active Courses',
    value: '68',
    icon: BookOpen,
    trend: '+5%',
    trendUp: true,
  },
  {
    label: 'System Usage',
    value: '92%',
    icon: TrendingUp,
    trend: '+8%',
    trendUp: true,
  },
];

const recentAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Server load high (85%)',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'info',
    message: 'New course materials uploaded',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'success',
    message: 'System backup completed',
    timestamp: '6 hours ago',
  },
];

const recentActivities = [
  {
    id: 1,
    user: 'John Smith',
    action: 'Created new course',
    details: 'Advanced Mathematics 201',
    timestamp: '1 hour ago',
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    action: 'Updated student records',
    details: 'Grade updates for Physics 101',
    timestamp: '2 hours ago',
  },
  {
    id: 3,
    user: 'Michael Brown',
    action: 'Generated reports',
    details: 'Monthly attendance report',
    timestamp: '3 hours ago',
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Administrator Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage your educational institution
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-primary" />
              <span
                className={`text-sm font-medium ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </h3>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">System Alerts</h2>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <AlertCircle className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Alerts
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activities</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.details}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {activity.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" className="w-full mt-4">
            View All Activities
          </Button>
        </Card>
      </div>
    </div>
  );
}