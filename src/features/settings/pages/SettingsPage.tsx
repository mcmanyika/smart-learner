import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/features/auth/store';
import { SettingsForm } from '../components/SettingsForm';
import { SystemSettingsForm } from '../components/SystemSettingsForm';
import { settingsService } from '../api/settings.service';

export function SettingsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const { data: userSettings } = useQuery({
    queryKey: ['settings', 'user'],
    queryFn: () => settingsService.getUserSettings(),
  });

  const { data: systemSettings, refetch: refetchSystemSettings } = useQuery({
    queryKey: ['settings', 'system'],
    queryFn: () => settingsService.getSystemSettings(),
    enabled: isAdmin,
  });

  if (!userSettings) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and system preferences
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="system">System Settings</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="account" className="mt-6">
          <SettingsForm settings={userSettings} />
        </TabsContent>
        {isAdmin && (
          <TabsContent value="system" className="mt-6">
            <SystemSettingsForm
              settings={systemSettings || []}
              onUpdate={refetchSystemSettings}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}