import Database from 'better-sqlite3';
import { env } from '@/server/config/env';

const db = new Database(env.DATABASE_URL);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS assignments (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    class_id TEXT NOT NULL,
    teacher_id TEXT NOT NULL,
    due_date TEXT NOT NULL,
    points INTEGER NOT NULL,
    status TEXT NOT NULL,
    priority TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    assignment_id TEXT NOT NULL,
    student_id TEXT NOT NULL,
    status TEXT NOT NULL,
    grade INTEGER,
    feedback TEXT,
    submitted_at TEXT NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
  );
`);

// Prepare statements
export const statements = {
  // Assignment statements
  listAssignments: db.prepare(`
    SELECT 
      a.*,
      c.name as class_name,
      u.name as teacher_name
    FROM assignments a
    JOIN classes c ON a.class_id = c.id
    JOIN users u ON a.teacher_id = u.id
  `),

  findAssignmentById: db.prepare(`
    SELECT 
      a.*,
      c.name as class_name,
      u.name as teacher_name
    FROM assignments a
    JOIN classes c ON a.class_id = c.id
    JOIN users u ON a.teacher_id = u.id
    WHERE a.id = ?
  `),

  createAssignment: db.prepare(`
    INSERT INTO assignments (
      id, title, description, class_id, teacher_id,
      due_date, points, status, priority, created_at, updated_at
    ) VALUES (
      @id, @title, @description, @classId, @teacherId,
      @dueDate, @points, @status, @priority, @createdAt, @updatedAt
    )
    RETURNING *
  `),

  updateAssignment: db.prepare(`
    UPDATE assignments
    SET
      title = COALESCE(@title, title),
      description = COALESCE(@description, description),
      class_id = COALESCE(@classId, class_id),
      due_date = COALESCE(@dueDate, due_date),
      points = COALESCE(@points, points),
      priority = COALESCE(@priority, priority),
      updated_at = @updatedAt
    WHERE id = @id AND teacher_id = @teacherId
    RETURNING *
  `),

  deleteAssignment: db.prepare(`
    DELETE FROM assignments
    WHERE id = ? AND teacher_id = ?
  `),

  // Submission statements
  createSubmission: db.prepare(`
    INSERT INTO submissions (
      id, assignment_id, student_id, status, submitted_at
    ) VALUES (
      @id, @assignmentId, @studentId, @status, @submittedAt
    )
    RETURNING *
  `),

  gradeSubmission: db.prepare(`
    UPDATE submissions
    SET grade = @grade, feedback = @feedback, status = @status
    WHERE id = @id AND assignment_id = @assignmentId
    RETURNING *
  `),
};