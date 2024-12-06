import { ReportUploadData, StudentReport } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock reports data
const mockReports: StudentReport[] = [
  {
    id: '1',
    title: 'Mid-term Assessment Report',
    type: 'academic',
    description: 'Comprehensive mid-term assessment results',
    fileUrl: '/reports/mid-term-assessment.pdf',
    teacherId: '2',
    teacherName: 'John Smith',
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Monthly Attendance Report',
    type: 'attendance',
    description: 'Student attendance records for March 2024',
    fileUrl: '/reports/attendance-march-2024.pdf',
    teacherId: '2',
    teacherName: 'John Smith',
    uploadedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const reportsService = {
  uploadReport: async (data: ReportUploadData): Promise<StudentReport> => {
    await delay(1500); // Simulate upload delay
    
    const newReport: StudentReport = {
      id: String(mockReports.length + 1),
      title: data.title,
      type: data.type,
      description: data.description,
      fileUrl: URL.createObjectURL(data.file[0]), // In a real app, this would be a server URL
      teacherId: '2', // Mock teacher ID
      teacherName: 'John Smith',
      uploadedAt: new Date().toISOString(),
    };
    
    mockReports.push(newReport);
    return newReport;
  },

  getReports: async (): Promise<StudentReport[]> => {
    await delay(500);
    return mockReports;
  },

  downloadReport: async (reportId: string): Promise<Blob> => {
    await delay(1000);
    // In a real app, this would download the actual file
    return new Blob(['Mock report content'], { type: 'application/pdf' });
  },
};