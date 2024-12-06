import { useQuery } from '@tanstack/react-query';
import { messagesApi } from '../api';
import type { Conversation } from '../types';

export function useMessages(conversation?: Conversation) {
  return useQuery({
    queryKey: ['messages', conversation?.id],
    queryFn: () =>
      conversation
        ? messagesApi.getMessages(conversation.id)
        : Promise.resolve([]),
    enabled: !!conversation,
  });
}