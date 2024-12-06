import { Route } from 'react-router-dom';
import { StudentsReportPage } from './pages/students/StudentsReportPage';

export const reportRoutes = (
  <Route path="reports">
    <Route index element={<StudentsReportPage />} />
  </Route>
);