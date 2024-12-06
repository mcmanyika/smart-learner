import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { statements } from '@/lib/db';
import { auth, authorize } from '../middleware/auth';

const router = Router();

const createClassSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  subject: z.string().min(1),
  schedule: z.string().optional(),
  room: z.string().optional(),
  capacity: z.number().positive().optional(),
});

const updateClassSchema = createClassSchema.partial();

// List all classes
router.get('/', auth, (req, res) => {
  const classes = statements.listClasses.all();
  res.json(classes);
});

// Get a specific class
router.get('/:id', auth, (req, res) => {
  const class_ = statements.findClassById.get(req.params.id);
  if (!class_) {
    return res.status(404).json({ message: 'Class not found' });
  }
  res.json(class_);
});

// Create a new class
router.post('/', auth, authorize(['teacher', 'admin']), (req, res) => {
  const data = createClassSchema.parse(req.body);
  
  const class_ = statements.createClass.get({
    id: randomUUID(),
    ...data,
    teacher_id: req.user!.id,
  });

  res.status(201).json(class_);
});

// Update a class
router.put('/:id', auth, authorize(['teacher', 'admin']), (req, res) => {
  const data = updateClassSchema.parse(req.body);
  
  const class_ = statements.updateClass.get({
    id: req.params.id,
    teacher_id: req.user!.id,
    ...data,
  });

  if (!class_) {
    return res.status(404).json({ message: 'Class not found' });
  }

  res.json(class_);
});

// Delete a class
router.delete('/:id', auth, authorize(['teacher', 'admin']), (req, res) => {
  const result = statements.deleteClass.run(req.params.id, req.user!.id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Class not found' });
  }

  res.status(204).send();
});

// Enroll in a class
router.post('/:id/enroll', auth, authorize(['student']), (req, res) => {
  const class_ = statements.findClassById.get(req.params.id);
  if (!class_) {
    return res.status(404).json({ message: 'Class not found' });
  }

  try {
    statements.enrollStudent.run(req.params.id, req.user!.id);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ message: 'Already enrolled in this class' });
  }
});

// Unenroll from a class
router.delete('/:id/enroll', auth, authorize(['student']), (req, res) => {
  const result = statements.unenrollStudent.run(req.params.id, req.user!.id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Enrollment not found' });
  }

  res.status(204).send();
});

// Get class enrollments
router.get('/:id/enrollments', auth, authorize(['teacher', 'admin']), (req, res) => {
  const enrollments = statements.getClassEnrollments.all(req.params.id);
  res.json(enrollments);
});

// Get my enrollments
router.get('/my-enrollments', auth, authorize(['student']), (req, res) => {
  const enrollments = statements.getStudentEnrollments.all(req.user!.id);
  res.json(enrollments);
});

export default router;