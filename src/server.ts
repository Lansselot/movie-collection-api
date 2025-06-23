import dotenv from 'dotenv';
import { sequelize } from './sequelize';
import { app } from './app';

dotenv.config();

async function startSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function startServer() {
  await startSequelize();

  const PORT = process.env.APP_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
