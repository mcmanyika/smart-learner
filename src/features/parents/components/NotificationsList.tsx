import { Card } from '@/components/ui/card';
import { Bell, CheckCircle } from 'lucide-react';
import { formatRelative } from '@/lib/utils/date';
import { cn } from '@/lib/utils';
import type { ParentNotification } from '../types';

interface NotificationsListProps {
  notifications: ParentNotification[];
  onMarkAsRead: (id: string) => void;
}

const notificationColors = {
  academic: 'bg-blue-50 border-blue-200',
  attendance: 'bg-green-50 border-green-200',
  behavior: 'bg-yellow-50 border-yellow-200',
  general: 'bg-gray-50 border-gray-200',
};

export function NotificationsList({ notifications, onMarkAsRead }: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No new notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={cn(
            'p-4 border-l-4 transition-colors',
            notificationColors[notification.type],
            !notification.read && 'bg-primary/5'
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {formatRelative(notification.date)}
              </p>
            </div>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-primary hover:text-primary/80"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}