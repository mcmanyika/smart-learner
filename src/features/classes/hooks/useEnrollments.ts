import { useQuery } from '@tanstack/react-query';
import { classesService } from '../api/classes.service';

export function useEnrollments(classId: string) {
  return useQuery({
    queryKey: ['enrollments', classId],
    queryFn: () => classesService.getClassEnrollments(classId),
  });
}

export function useMyEnrollments() {
  return useQuery({
    queryKey: ['my-enrollments'],
    queryFn: () => classesService.getMyEnrollments(),
  });
}