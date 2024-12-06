export interface Class {
  id: string;
  name: string;
  description?: string;
  subject: string;
  teacherId: string;
  teacherName?: string;
  teacherEmail?: string;
  schedule?: string;
  room?: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClassEnrollment {
  classId: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  status: 'enrolled' | 'pending' | 'completed';
  enrolledAt: string;
  completedAt?: string;
}

export interface CreateClassData {
  name: string;
  description?: string;
  subject: string;
  schedule?: string;
  room?: string;
  capacity?: number;
}

export interface UpdateClassData extends Partial<CreateClassData> {}