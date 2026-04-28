import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import errorMiddleware from './middleware/error.middleware';
import { DBCONN } from './config/db';
import authRoutes from './modules/user/user.routes';
import realEstateRouter from './modules/real-estate/real-estate.routes';
import favoriteRouter from './modules/favorite/favorite.routes';
import adminRouter from './modules/admin/admin.routes';
import schedulingRouter from './modules/scheduling/scheduling.routes';
import { env } from './config/env';

const app: Application = express();

//connect to database
DBCONN();

//Middleware
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/real-estate', realEstateRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/admin', adminRouter);
app.use('/api/scheduling', schedulingRouter);
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// Error Handler
app.use(errorMiddleware);

export default app;
