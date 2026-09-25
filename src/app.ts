import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import personRoutes from './routes/person.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Root Route
app.get('/', (_req, res) => {
  res.json({ message: '🚀 API RESTful Node.js + TypeScript + PostgreSQL (Prisma) + Redis' });
});

// API Routes
app.use('/person', personRoutes);

// Error Handler
app.use(errorHandler);

export default app;
