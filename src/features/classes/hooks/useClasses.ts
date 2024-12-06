import { useQuery } from '@tanstack/react-query';
import { classesService } from '../api/classes.service';

export function useClasses() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: () => classesService.getClasses(),
  });
}