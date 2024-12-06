import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { studentSchema } from '../schemas';
import type { Student } from '../types';

interface StudentFormProps {
  defaultValues?: Partial<Student>;
  onSubmit: (data: Partial<Student>) => void;
  isLoading?: boolean;
}

export function StudentForm({ defaultValues, onSubmit, isLoading }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Partial<Student>>({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter student's full name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter student's email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            {...register('studentId')}
            placeholder="Enter student ID"
          />
          {errors.studentId && (
            <p className="text-sm text-red-500">{errors.studentId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            onValueChange={(value) => setValue('gender', value as 'male' | 'female')}
            defaultValue={defaultValues?.gender}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Input
            id="grade"
            {...register('grade')}
            placeholder="Enter grade/class"
          />
          {errors.grade && (
            <p className="text-sm text-red-500">{errors.grade.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentName">Parent/Guardian Name</Label>
          <Input
            id="parentName"
            {...register('parentName')}
            placeholder="Enter parent's name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
          <Input
            id="parentEmail"
            type="email"
            {...register('parentEmail')}
            placeholder="Enter parent's email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) => setValue('status', value as Student['status'])}
            defaultValue={defaultValues?.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="graduated">Graduated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="Enter full address"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : defaultValues ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}