import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { auth, authorize } from '../middleware/auth';
import { statements } from '@/lib/db';

const router = Router();

const assignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  classId: z.string().min(1),
  dueDate: z.string().min(1),
  points: z.number().min(0),
  priority: z.enum(['low', 'medium', 'high']),
});

// List assignments
router.get('/', auth, (req, res) => {
  const assignments = statements.listAssignments.all();
  res.json(assignments);
});

// Get assignment by ID
router.get('/:id', auth, (req, res) => {
  const assignment = statements.findAssignmentById.get(req.params.id);
  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }
  res.json(assignment);
});

// Create assignment
router.post('/', auth, authorize(['teacher', 'admin']), (req, res) => {
  const data = assignmentSchema.parse(req.body);
  
  const assignment = statements.createAssignment.get({
    id: randomUUID(),
    ...data,
    teacherId: req.user!.id,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  res.status(201).json(assignment);
});

// Update assignment
router.put('/:id', auth, authorize(['teacher', 'admin']), (req, res) => {
  const data = assignmentSchema.partial().parse(req.body);
  
  const assignment = statements.updateAssignment.get({
    id: req.params.id,
    teacherId: req.user!.id,
    ...data,
    updatedAt: new Date().toISOString(),
  });

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  res.json(assignment);
});

// Delete assignment
router.delete('/:id', auth, authorize(['teacher', 'admin']), (req, res) => {
  const result = statements.deleteAssignment.run(req.params.id, req.user!.id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  res.status(204).send();
});

// Submit assignment
router.post('/:id/submit', auth, authorize(['student']), (req, res) => {
  const assignmentId = req.params.id;
  const studentId = req.user!.id;

  const submission = statements.createSubmission.get({
    id: randomUUID(),
    assignmentId,
    studentId,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
  });

  res.status(201).json(submission);
});

// Grade submission
router.put('/:id/submissions/:submissionId/grade', auth, authorize(['teacher', 'admin']), (req, res) => {
  const { grade, feedback } = z.object({
    grade: z.number().min(0),
    feedback: z.string().optional(),
  }).parse(req.body);

  const submission = statements.gradeSubmission.get({
    id: req.params.submissionId,
    assignmentId: req.params.id,
    grade,
    feedback,
    status: 'graded',
  });

  if (!submission) {
    return res.status(404).json({ message: 'Submission not found' });
  }

  res.json(submission);
});

export default router;