import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Bell, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { parentsService } from '@/features/parents/api/parents.service';

export function ParentDashboard() {
  const { data: children = [] } = useQuery({
    queryKey: ['children'],
    queryFn: () => parentsService.getChildren(),
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => parentsService.getNotifications(),
  });

  const stats = [
    {
      label: 'Children',
      value: children.length,
      icon: Users,
    },
    {
      label: 'Average GPA',
      value: (children.reduce((acc, child) => acc + child.gpa, 0) / children.length).toFixed(2),
      icon: GraduationCap,
    },
    {
      label: 'Notifications',
      value: notifications.filter(n => !n.read).length,
      icon: Bell,
    },
    {
      label: 'Upcoming Events',
      value: children.reduce((acc, child) => acc + child.upcomingEvents.length, 0),
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Parent Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your children's academic progress and stay updated
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-2">
              <stat.icon className="h-8 w-8 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </h3>
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Academic Updates</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/children">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {children.map((child) => (
              <div key={child.id} className="space-y-2">
                <h3 className="font-medium">{child.name}</h3>
                {child.recentGrades.slice(0, 2).map((grade, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{grade.subject}</span>
                    <span className="font-medium">{grade.grade}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/calendar">View Calendar</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {children.flatMap(child => 
              child.upcomingEvents.map(event => ({
                ...event,
                childName: child.name,
              }))
            )
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((event) => (
              <div key={event.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.childName}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}