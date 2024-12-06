import { Card } from '@/components/ui/card';
import { GraduationCap, Clock, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils/date';
import type { Child } from '../types';

interface ChildOverviewProps {
  child: Child;
}

export function ChildOverview({ child }: ChildOverviewProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">{child.name}</h3>
          <p className="text-sm text-muted-foreground">
            Grade {child.grade} - {child.class}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">GPA</p>
            <p className="text-xl font-bold text-primary">{child.gpa}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Attendance</p>
            <p className="text-xl font-bold text-primary">{child.attendance}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" />
            Recent Grades
          </h4>
          <div className="space-y-2">
            {child.recentGrades.map((grade, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{grade.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(grade.date)}
                  </p>
                </div>
                <span className="text-lg font-bold">{grade.grade}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Upcoming Events
          </h4>
          <div className="space-y-2">
            {child.upcomingEvents.map((event) => (
              <div key={event.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.date)}
                  </p>
                </div>
                <span className="text-sm capitalize px-2 py-1 rounded-full bg-primary/10">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}