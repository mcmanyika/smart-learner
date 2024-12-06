import { LazyImage } from '@/components/common/LazyImage';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import type { ProfileData } from '../types';

interface ProfileHeaderProps {
  profile: ProfileData;
  onAvatarChange?: (file: File) => void;
}

export function ProfileHeader({ profile, onAvatarChange }: ProfileHeaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary to-blue-600" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="relative group">
            <LazyImage
              src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.name}`}
              alt={profile.name}
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              fallback={`https://ui-avatars.com/api/?name=${profile.name}`}
            />
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="h-8 w-8 text-white" />
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {profile.name}
              </h1>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}