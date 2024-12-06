import { useState } from 'react';
import { useAuth } from '@/features/auth/store';
import { ConversationList } from '../components/ConversationList';
import { ConversationHeader } from '../components/ConversationHeader';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { useConversations } from '../hooks/useConversations';
import { useMessages } from '../hooks/useMessages';
import { useSendMessage } from '../hooks/useSendMessage';
import type { Conversation } from '../types';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const { user } = useAuth();

  const { data: conversations = [] } = useConversations();
  const { data: messages = [] } = useMessages(selectedConversation);
  const sendMessage = useSendMessage(selectedConversation);

  const otherParticipant = selectedConversation?.participants.find(
    (p) => p.id !== user?.id
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-80 bg-white">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation?.id}
          onSelect={setSelectedConversation}
        />
      </div>
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          <ConversationHeader participant={otherParticipant} />
          <MessageList messages={messages} />
          <MessageInput
            onSend={(content) => sendMessage.mutate(content)}
            isLoading={sendMessage.isPending}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  );
}