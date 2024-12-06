import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { reportUploadSchema } from '../../schemas';
import type { ReportUploadData } from '../../types';

interface ReportUploadFormProps {
  onSubmit: (data: ReportUploadData) => void;
  isLoading?: boolean;
}

export function ReportUploadForm({ onSubmit, isLoading }: ReportUploadFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReportUploadData>({
    resolver: zodResolver(reportUploadSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Report Title</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="e.g., Mid-term Assessment Report"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="type">Report Type</Label>
          <Select onValueChange={(value) => setValue('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic Performance</SelectItem>
              <SelectItem value="attendance">Attendance</SelectItem>
              <SelectItem value="behavior">Behavioral</SelectItem>
              <SelectItem value="progress">Progress Report</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Brief description of the report"
            className="h-24"
          />
        </div>

        <div>
          <Label htmlFor="file">Report File</Label>
          <Input
            id="file"
            type="file"
            {...register('file')}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
          {errors.file && (
            <p className="text-sm text-red-500">{errors.file.message}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Supported formats: PDF, DOC, DOCX, XLS, XLSX
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Report'}
        </Button>
      </div>
    </form>
  );
}