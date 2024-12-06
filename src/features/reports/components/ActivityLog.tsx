import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import type { UserActivityLog } from '../types';

interface ActivityLogProps {
  activities: UserActivityLog[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{activity.userName}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {activity.userRole}
                  </p>
                </div>
              </TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell className="max-w-xs truncate">
                {activity.details}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(activity.timestamp), 'PPp')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}