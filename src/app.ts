import express, { Express } from 'express';
import { actorRoutes, authRoutes, movieRoutes, userRoutes } from './routes';
import { errorHandler } from './middleware/error-handler.middleware';

export const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/actors', actorRoutes);

app.use('/', (_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);
