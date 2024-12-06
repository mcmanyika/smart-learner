import { Child, ParentNotification } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockChildren: Child[] = [
  {
    id: '1',
    name: 'John Doe Jr.',
    grade: '10th',
    class: 'Section A',
    attendance: 95,
    gpa: 3.8,
    recentGrades: [
      { subject: 'Mathematics', grade: 92, date: '2024-03-15' },
      { subject: 'Physics', grade: 88, date: '2024-03-12' },
      { subject: 'English', grade: 90, date: '2024-03-10' },
    ],
    upcomingEvents: [
      { id: '1', title: 'Math Final Exam', date: '2024-04-15', type: 'exam' },
      { id: '2', title: 'Science Project Due', date: '2024-04-10', type: 'assignment' },
      { id: '3', title: 'Parent-Teacher Meeting', date: '2024-04-05', type: 'event' },
    ],
  },
  {
    id: '2',
    name: 'Sarah Doe',
    grade: '8th',
    class: 'Section B',
    attendance: 98,
    gpa: 3.9,
    recentGrades: [
      { subject: 'Science', grade: 95, date: '2024-03-14' },
      { subject: 'History', grade: 92, date: '2024-03-11' },
      { subject: 'Art', grade: 88, date: '2024-03-09' },
    ],
    upcomingEvents: [
      { id: '4', title: 'History Presentation', date: '2024-04-12', type: 'assignment' },
      { id: '5', title: 'Art Exhibition', date: '2024-04-08', type: 'event' },
    ],
  },
];

const mockNotifications: ParentNotification[] = [
  {
    id: '1',
    title: 'Excellent Performance',
    message: 'John scored 92% in the recent Mathematics test.',
    type: 'academic',
    date: '2024-03-15',
    read: false,
  },
  {
    id: '2',
    title: 'Attendance Alert',
    message: 'Sarah has maintained 100% attendance this month.',
    type: 'attendance',
    date: '2024-03-14',
    read: true,
  },
];

export const parentsService = {
  getChildren: async (): Promise<Child[]> => {
    await delay(500);
    return mockChildren;
  },

  getNotifications: async (): Promise<ParentNotification[]> => {
    await delay(500);
    return mockNotifications;
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    await delay(200);
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },
};