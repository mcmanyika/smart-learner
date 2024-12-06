import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HomePage } from '@/pages/HomePage';
import { PricingPage } from '@/pages/PricingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { PrivateRoute } from '@/features/auth/routes/PrivateRoute';
import { PublicRoute } from '@/features/auth/routes/PublicRoute';
import { DashboardOverview } from '@/features/dashboard/pages/DashboardOverview';
import { UsersPage } from '@/features/users/pages/UsersPage';
import { ClassesPage } from '@/features/classes/pages/ClassesPage';
import { StudentsPage } from '@/features/students/pages/StudentsPage';
import { ReportsPage } from '@/features/reports/pages/ReportsPage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';
import { ProfilePage } from '@/features/profile/pages/ProfilePage';
import { StudentReportUploadPage } from '@/features/reports/pages/students/StudentReportUploadPage';

export function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with header and footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Auth routes without header and footer */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route 
            path="users" 
            element={
              <PrivateRoute roles={['admin']}>
                <UsersPage />
              </PrivateRoute>
            } 
          />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route 
            path="reports" 
            element={
              <PrivateRoute roles={['admin', 'teacher']}>
                <ReportsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="reports/upload" 
            element={
              <PrivateRoute roles={['teacher']}>
                <StudentReportUploadPage />
              </PrivateRoute>
            } 
          />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;