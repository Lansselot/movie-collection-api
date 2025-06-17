import express, { Express } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './sequelize';

dotenv.config();

async function startSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error(error);
  }
}

startSequelize();

const app: Express = express();

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
