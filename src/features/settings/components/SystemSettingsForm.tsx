import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { settingsService } from '../api/settings.service';
import type { SystemSettings } from '../types';

interface SystemSettingsFormProps {
  settings: SystemSettings[];
  onUpdate: () => void;
}

export function SystemSettingsForm({ settings, onUpdate }: SystemSettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.id, s.value]))
  );
  const { toast } = useToast();

  const handleSave = async (setting: SystemSettings) => {
    try {
      await settingsService.updateSystemSetting(setting.id, values[setting.id]);
      onUpdate();
      toast({
        title: 'Success',
        description: 'Setting updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update setting',
      });
    }
  };

  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SystemSettings[]>);

  return (
    <div className="space-y-6">
      {Object.entries(settingsByCategory).map(([category, categorySettings]) => (
        <Card key={category} className="p-6">
          <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
          <div className="space-y-4">
            {categorySettings.map((setting) => (
              <div key={setting.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">{setting.name}</label>
                  {setting.description && (
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={values[setting.id]}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [setting.id]: e.target.value,
                      }))
                    }
                    className="w-64"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleSave(setting)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}