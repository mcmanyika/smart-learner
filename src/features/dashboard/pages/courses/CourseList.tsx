import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Mathematics 101',
    description: 'Introduction to basic mathematical concepts',
    instructor: 'Dr. Sarah Chen',
    students: 32,
    duration: '4 months',
    progress: 65,
  },
  {
    id: 2,
    title: 'Physics Fundamentals',
    description: 'Basic principles of physics and mechanics',
    instructor: 'Prof. James Wilson',
    students: 28,
    duration: '3 months',
    progress: 45,
  },
  {
    id: 3,
    title: 'English Literature',
    description: 'Analysis of classic literary works',
    instructor: 'Dr. Emily Brown',
    students: 35,
    duration: '4 months',
    progress: 80,
  },
];

export function CourseList() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Manage and track your enrolled courses
          </p>
        </div>
        <Button>Browse More Courses</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4" />
                {course.students} students
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Instructor: {course.instructor}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <Button className="w-full">Continue Learning</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}