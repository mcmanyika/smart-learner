import { format } from 'date-fns';
import { useAuth } from '@/features/auth/store';
import { Conversation } from '../types';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const { user } = useAuth();

  return (
    <div className="border-r h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Messages</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {conversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (p) => p.id !== user?.id
          );

          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className={cn(
                'w-full p-4 text-left hover:bg-gray-50 border-b transition-colors',
                selectedId === conversation.id && 'bg-gray-50'
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{otherParticipant?.name}</p>
                  {conversation.lastMessage && (
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {conversation.lastMessage &&
                    format(
                      new Date(conversation.lastMessage.timestamp),
                      'MMM d, p'
                    )}
                </div>
              </div>
              {conversation.unreadCount > 0 && (
                <div className="mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                    {conversation.unreadCount}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}