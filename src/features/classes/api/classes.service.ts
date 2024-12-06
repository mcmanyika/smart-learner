import { Class, CreateClassData, UpdateClassData, ClassEnrollment } from '../types';
import { mockClasses } from '@/lib/mock-data/classes';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const classesService = {
  getClasses: async () => {
    await delay(500);
    return mockClasses;
  },

  getClassById: async (id: string) => {
    await delay(500);
    return mockClasses.find(c => c.id === id);
  },

  createClass: async (data: CreateClassData) => {
    await delay(500);
    const newClass: Class = {
      id: String(mockClasses.length + 1),
      ...data,
      teacherId: '2', // Mock teacher ID
      teacherName: 'John Smith',
      teacherEmail: 'teacher@smartlearner.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockClasses.push(newClass);
    return newClass;
  },

  updateClass: async (id: string, data: UpdateClassData) => {
    await delay(500);
    const index = mockClasses.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Class not found');
    
    mockClasses[index] = {
      ...mockClasses[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockClasses[index];
  },

  deleteClass: async (id: string) => {
    await delay(500);
    const index = mockClasses.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Class not found');
    mockClasses.splice(index, 1);
  },

  // Mock enrollment endpoints
  enrollStudent: async (classId: string) => {
    await delay(500);
    return {
      classId,
      studentId: '1',
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      status: 'enrolled',
      enrolledAt: new Date().toISOString(),
    } as ClassEnrollment;
  },

  unenrollStudent: async (classId: string) => {
    await delay(500);
  },

  getClassEnrollments: async (classId: string) => {
    await delay(500);
    return [] as ClassEnrollment[];
  },

  getMyEnrollments: async () => {
    await delay(500);
    return [] as (ClassEnrollment & Class)[];
  },
};