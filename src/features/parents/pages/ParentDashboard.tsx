import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildOverview } from '../components/ChildOverview';
import { NotificationsList } from '../components/NotificationsList';
import { parentsService } from '../api/parents.service';

export function ParentDashboard() {
  const queryClient = useQueryClient();

  const { data: children = [] } = useQuery({
    queryKey: ['children'],
    queryFn: () => parentsService.getChildren(),
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => parentsService.getNotifications(),
  });

  const markAsRead = useMutation({
    mutationFn: (id: string) => parentsService.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Parent Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your children's academic progress and stay updated
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {children.map((child) => (
          <ChildOverview key={child.id} child={child} />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {unreadCount} new
            </span>
          )}
        </h2>
        <NotificationsList
          notifications={notifications}
          onMarkAsRead={(id) => markAsRead.mutate(id)}
        />
      </div>
    </div>
  );
}