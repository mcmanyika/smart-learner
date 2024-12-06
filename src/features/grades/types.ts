export interface Grade {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  type: 'quiz' | 'exam' | 'assignment' | 'project';
  date: string;
  feedback?: string;
  teacherId: string;
  teacherName: string;
}

export interface GradesBySubject {
  subject: string;
  grades: Grade[];
  average: number;
  totalGrades: number;
}

export interface GradeStats {
  overallGPA: number;
  totalCredits: number;
  highestGrade: number;
  lowestGrade: number;
}