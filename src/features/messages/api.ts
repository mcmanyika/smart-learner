import { Message, NewMessageData, Conversation } from './types';
import { mockUsers } from '@/lib/mock-data';

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: '1',
      senderId: mockUsers[1].id,
      recipientId: mockUsers[0].id,
      content: 'When is the next staff meeting?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    unreadCount: 1,
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: '2',
      senderId: mockUsers[2].id,
      recipientId: mockUsers[0].id,
      content: 'I have submitted my assignment',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
    unreadCount: 0,
  },
];

// Mock messages data
const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      senderId: mockUsers[1].id,
      recipientId: mockUsers[0].id,
      content: 'When is the next staff meeting?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '2',
      senderId: mockUsers[0].id,
      recipientId: mockUsers[1].id,
      content: 'The staff meeting is scheduled for next Monday at 10 AM.',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      read: true,
    },
  ],
  '2': [
    {
      id: '3',
      senderId: mockUsers[2].id,
      recipientId: mockUsers[0].id,
      content: 'I have submitted my assignment',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
    {
      id: '4',
      senderId: mockUsers[0].id,
      recipientId: mockUsers[2].id,
      content: 'Great, I will review it soon.',
      timestamp: new Date(Date.now() - 7100000).toISOString(),
      read: true,
    },
  ],
};

export const messagesApi = {
  getConversations: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockConversations;
  },

  getMessages: async (conversationId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockMessages[conversationId] || [];
  },

  sendMessage: async (conversationId: string, data: NewMessageData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newMessage: Message = {
      id: String(Date.now()),
      senderId: data.recipientId,
      recipientId: data.recipientId,
      content: data.content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    mockMessages[conversationId] = [
      ...(mockMessages[conversationId] || []),
      newMessage,
    ];
    return newMessage;
  },

  markAsRead: async (conversationId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (mockMessages[conversationId]) {
      mockMessages[conversationId] = mockMessages[conversationId].map(message => ({
        ...message,
        read: true,
      }));
    }
  },
};