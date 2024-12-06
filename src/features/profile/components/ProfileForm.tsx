import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { profileSchema } from '../schemas';
import type { ProfileData, UpdateProfileData } from '../types';

interface ProfileFormProps {
  profile: ProfileData;
  onSubmit: (data: UpdateProfileData) => void;
  isLoading?: boolean;
}

export function ProfileForm({ profile, onSubmit, isLoading }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder="Tell us about yourself"
            className="h-32"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Social Links</Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Input
                {...register('socialLinks.twitter')}
                placeholder="Twitter URL"
              />
            </div>
            <div>
              <Input
                {...register('socialLinks.linkedin')}
                placeholder="LinkedIn URL"
              />
            </div>
            <div>
              <Input
                {...register('socialLinks.github')}
                placeholder="GitHub URL"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}