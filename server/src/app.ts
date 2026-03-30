import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { DBCONN } from './config/db';
import authRoutes from './routes/user.routes';
import realEstateRouter from './routes/real-estate.routes';
import favoriteRouter from './routes/favorite.routes';
import { env } from './config/env';

const app: Application = express();

//connect to database
DBCONN();

//Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors(
  {
    origin: env.CLIENT_URL,
    credentials: true
  }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/real-estate', realEstateRouter);
app.use('/api/favorites', favoriteRouter);
app.get('/api/health', authMiddleware, (_req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// Error Handler
app.use(errorMiddleware);

export default app;
