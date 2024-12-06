export interface Child {
  id: string;
  name: string;
  grade: string;
  class: string;
  attendance: number;
  gpa: number;
  recentGrades: {
    subject: string;
    grade: number;
    date: string;
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: 'exam' | 'assignment' | 'event';
  }[];
}

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  type: 'academic' | 'attendance' | 'behavior' | 'general';
  date: string;
  read: boolean;
}