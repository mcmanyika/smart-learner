import { useQuery } from '@tanstack/react-query';
import { messagesApi } from '../api';

export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => messagesApi.getConversations(),
  });
}