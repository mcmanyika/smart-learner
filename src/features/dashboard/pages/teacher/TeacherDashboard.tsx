import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const stats = [
  {
    label: 'Total Students',
    value: '120',
    icon: Users,
  },
  {
    label: 'Active Classes',
    value: '5',
    icon: BookOpen,
  },
  {
    label: 'Reports Due',
    value: '8',
    icon: FileText,
  },
  {
    label: 'Hours Taught',
    value: '24',
    icon: Clock,
  },
];

const upcomingClasses = [
  {
    id: 1,
    subject: 'Mathematics 101',
    time: '09:00 AM',
    room: 'Room 204',
    students: 28,
  },
  {
    id: 2,
    subject: 'Advanced Algebra',
    time: '11:00 AM',
    room: 'Room 305',
    students: 24,
  },
  {
    id: 3,
    subject: 'Calculus',
    time: '02:00 PM',
    room: 'Room 201',
    students: 22,
  },
];

const pendingTasks = [
  {
    id: 1,
    task: 'Upload Progress Reports',
    course: 'Mathematics 101',
    deadline: 'Today',
    priority: 'high',
  },
  {
    id: 2,
    task: 'Prepare Lesson Plan',
    course: 'Advanced Algebra',
    deadline: 'Tomorrow',
    priority: 'medium',
  },
  {
    id: 3,
    task: 'Review Homework',
    course: 'Calculus',
    deadline: 'In 2 days',
    priority: 'low',
  },
];

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your classes and track student progress
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-2">
              <stat.icon className="h-8 w-8 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </h3>
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Today's Classes</h2>
            <Button variant="outline" size="sm">
              View Schedule
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div
                key={class_.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{class_.subject}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {class_.time}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {class_.room}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {class_.students} students
                    </span>
                  </div>
                </div>
                <Button size="sm">Start Class</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Pending Tasks</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/reports/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Report
              </Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.task}</TableCell>
                  <TableCell>{task.course}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <AlertCircle
                      className={`h-4 w-4 ${priorityColors[task.priority]}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}