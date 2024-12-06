import { Router } from 'express';
import { auth, authorize } from '../middleware/auth';
import { statements } from '@/lib/db';

const router = Router();

// Only allow admins to access reports
router.use(auth, authorize(['admin']));

router.get('/overview', (req, res) => {
  // Mock data for demonstration
  const metrics = [
    {
      label: 'Total Students',
      value: '1,234',
      change: 12,
      trend: 'up',
    },
    {
      label: 'Average Attendance',
      value: '92%',
      change: 3,
      trend: 'up',
    },
    {
      label: 'Active Classes',
      value: '45',
      change: 5,
      trend: 'up',
    },
    {
      label: 'System Usage',
      value: '89%',
      change: -2,
      trend: 'down',
    },
  ];

  res.json(metrics);
});

router.get('/activity', (req, res) => {
  // Mock activity data
  const activities = [
    {
      id: '1',
      userId: '1',
      userName: 'John Smith',
      userRole: 'teacher',
      action: 'Created new assignment',
      details: 'Math Quiz - Chapter 5',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah Johnson',
      userRole: 'student',
      action: 'Submitted assignment',
      details: 'Physics Lab Report',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  res.json(activities);
});

router.get('/export/:type', (req, res) => {
  // Implementation for report export
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
  res.send('Date,Metric,Value\n2024-03-20,Students,1234');
});

export default router;