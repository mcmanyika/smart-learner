import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, AlertCircle } from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Mathematical Problem Set 3',
    course: 'Mathematics 101',
    dueDate: '2024-04-15',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    course: 'Physics Fundamentals',
    dueDate: '2024-04-18',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Literature Essay',
    course: 'English Literature',
    dueDate: '2024-04-20',
    status: 'completed',
    priority: 'low',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export function AssignmentList() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            Track and manage your assignments
          </p>
        </div>
        <Button>Create New Assignment</Button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {assignment.course}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[assignment.status]
                  }`}
                >
                  {assignment.status}
                </span>
                <AlertCircle
                  className={`h-5 w-5 ${
                    priorityColors[assignment.priority]
                  }`}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="mr-2 h-4 w-4" />
                  View Details
                </div>
              </div>
              <Button variant="outline">Submit Assignment</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}