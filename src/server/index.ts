import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/error';
import authRoutes from './routes/auth';
import classesRoutes from './routes/classes';
import assignmentsRoutes from './routes/assignments';
import settingsRoutes from './routes/settings';
import reportsRoutes from './routes/reports';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportsRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});