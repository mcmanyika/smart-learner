import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '../api';
import type { Conversation } from '../types';

export function useSendMessage(conversation?: Conversation) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      messagesApi.sendMessage(conversation!.id, {
        recipientId: conversation!.participants[1].id,
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}