import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/store';
import { getDashboardConfig } from '../config/dashboardConfig';

export function DashboardSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const dashboardConfig = getDashboardConfig(user?.role);

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r">
      <nav className="p-4 space-y-2">
        {dashboardConfig.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              location.pathname === item.path
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}