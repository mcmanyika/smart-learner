import { CalendarEvent } from '../types';

export const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Mathematics Quiz',
    date: '2024-04-15',
    type: 'assessment',
    course: 'Mathematics 101',
    description: 'Chapter 5: Calculus fundamentals',
  },
  {
    id: 2,
    title: 'Physics Lab Session',
    date: '2024-04-16',
    type: 'class',
    course: 'Physics Fundamentals',
    description: 'Practical experiment on wave motion',
  },
  {
    id: 3,
    title: 'Literature Essay Due',
    date: '2024-04-18',
    type: 'assignment',
    course: 'English Literature',
    description: "Analysis of Shakespeare's Macbeth",
  },
  {
    id: 4,
    title: 'Parent-Teacher Meeting',
    date: '2024-04-20',
    type: 'meeting',
    description: 'Semester progress discussion',
  },
];