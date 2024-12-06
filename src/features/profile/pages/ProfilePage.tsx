import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { profileService } from '../api/profile.service';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileForm } from '../components/ProfileForm';
import type { UpdateProfileData } from '../types';

export function ProfilePage() {
  const { toast } = useToast();
  
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileData) => profileService.updateProfile(data),
    onSuccess: () => {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
      });
    },
  });

  if (isLoading || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
          <ProfileForm
            profile={profile}
            onSubmit={(data) => mutation.mutate(data)}
            isLoading={mutation.isPending}
          />
        </Card>
      </div>
    </div>
  );
}