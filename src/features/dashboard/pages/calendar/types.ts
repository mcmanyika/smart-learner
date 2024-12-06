export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'assessment' | 'class' | 'assignment' | 'meeting';
  course?: string;
  description: string;
}

export interface EventType {
  value: string;
  label: string;
}

export interface EventColors {
  [key: string]: string;
}