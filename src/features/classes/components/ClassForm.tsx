import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { classSchema } from '../schemas';
import type { CreateClassData, Class } from '../types';

interface ClassFormProps {
  defaultValues?: Partial<Class>;
  onSubmit: (data: CreateClassData) => void;
  isLoading?: boolean;
}

export function ClassForm({ defaultValues, onSubmit, isLoading }: ClassFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassData>({
    resolver: zodResolver(classSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Class Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Enter class name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          {...register('subject')}
          placeholder="Enter subject"
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter class description"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule</Label>
          <Input
            id="schedule"
            {...register('schedule')}
            placeholder="e.g., Mon/Wed 10:00 AM"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="room">Room</Label>
          <Input
            id="room"
            {...register('room')}
            placeholder="Enter room number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          {...register('capacity', { valueAsNumber: true })}
          placeholder="Enter maximum number of students"
        />
        {errors.capacity && (
          <p className="text-sm text-red-500">{errors.capacity.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : defaultValues ? 'Update Class' : 'Create Class'}
        </Button>
      </div>
    </form>
  );
}