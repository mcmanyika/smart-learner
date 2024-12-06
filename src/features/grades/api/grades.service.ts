import { Grade, GradeStats } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock grades data
const mockGrades: Grade[] = [
  {
    id: '1',
    subject: 'Mathematics',
    score: 85,
    maxScore: 100,
    type: 'exam',
    date: '2024-03-15',
    feedback: 'Excellent work on calculus problems',
    teacherId: '2',
    teacherName: 'John Smith',
  },
  {
    id: '2',
    subject: 'Physics',
    score: 92,
    maxScore: 100,
    type: 'quiz',
    date: '2024-03-10',
    teacherId: '2',
    teacherName: 'John Smith',
  },
  {
    id: '3',
    subject: 'English',
    score: 88,
    maxScore: 100,
    type: 'assignment',
    date: '2024-03-05',
    feedback: 'Well-written essay',
    teacherId: '2',
    teacherName: 'John Smith',
  },
];

export const gradesService = {
  getGrades: async (): Promise<Grade[]> => {
    await delay(500);
    return mockGrades;
  },

  getGradeStats: async (): Promise<GradeStats> => {
    await delay(500);
    return {
      overallGPA: 3.7,
      totalCredits: 45,
      highestGrade: 92,
      lowestGrade: 85,
    };
  },
};