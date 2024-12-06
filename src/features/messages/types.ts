import { User } from '@/features/auth/types';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface NewMessageData {
  recipientId: string;
  content: string;
}