import { User } from '@/features/auth/types';

interface ConversationHeaderProps {
  participant?: User;
}

export function ConversationHeader({ participant }: ConversationHeaderProps) {
  if (!participant) return null;

  return (
    <div className="p-4 border-b">
      <h2 className="font-semibold">{participant.name}</h2>
      <p className="text-sm text-muted-foreground">{participant.role}</p>
    </div>
  );
}