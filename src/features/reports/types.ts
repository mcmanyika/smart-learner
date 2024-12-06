export interface ReportUploadData {
  title: string;
  type: 'academic' | 'attendance' | 'behavior' | 'progress';
  description?: string;
  file: FileList;
}

export interface StudentReport {
  id: string;
  title: string;
  type: 'academic' | 'attendance' | 'behavior' | 'progress';
  description?: string;
  fileUrl: string;
  teacherId: string;
  teacherName: string;
  uploadedAt: string;
}

export interface ReportMetric {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  total: number;
}

export interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

export interface ClassPerformance {
  className: string;
  averageGrade: number;
  passRate: number;
  studentCount: number;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  timestamp: string;
}

export type ReportTimeframe = 'day' | 'week' | 'month' | 'year';

export interface ReportFilters {
  timeframe: ReportTimeframe;
  role?: string;
  classId?: string;
}