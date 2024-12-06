import { useQuery } from '@tanstack/react-query';
import { classesService } from '../api/classes.service';

export function useClass(id: string) {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: () => classesService.getClassById(id),
  });
}