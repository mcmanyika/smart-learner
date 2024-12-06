import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { UserRole } from '@/features/auth/types';

interface DashboardItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const commonItems: DashboardItem[] = [
  {
    label: 'Overview',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
];

const roleSpecificItems: Record<UserRole, DashboardItem[]> = {
  admin: [
    {
      label: 'Users',
      path: '/dashboard/users',
      icon: Users,
    },
    {
      label: 'Classes',
      path: '/dashboard/classes',
      icon: BookOpen,
    },
    {
      label: 'Reports',
      path: '/dashboard/reports',
      icon: FileText,
    },
    {
      label: 'Settings',
      path: '/dashboard/settings',
      icon: Settings,
    },
  ],
  teacher: [
    {
      label: 'Classes',
      path: '/dashboard/classes',
      icon: BookOpen,
    },
    {
      label: 'Students',
      path: '/dashboard/students',
      icon: Users,
    },
  ],
  student: [
    {
      label: 'Classes',
      path: '/dashboard/classes',
      icon: BookOpen,
    },
    {
      label: 'Grades',
      path: '/dashboard/grades',
      icon: GraduationCap,
    },
  ],
  parent: [
    {
      label: 'My Children',
      path: '/dashboard/children',
      icon: Users,
    },
    {
      label: 'Academic Progress',
      path: '/dashboard/progress',
      icon: GraduationCap,
    },
  ],
};

export function getDashboardConfig(role?: UserRole) {
  if (!role) return commonItems;
  return [...commonItems, ...roleSpecificItems[role]];
}