import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api';
import { UserFilters } from '../types';

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => usersApi.getUsers(),
    select: (users) => {
      let filtered = [...users];

      if (filters.role) {
        filtered = filtered.filter(user => user.role === filters.role);
      }

      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          user =>
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
      }

      return filtered;
    },
  });
}