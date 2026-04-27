import app from './app';
import { env } from './config/env';

const PORT = env.PORT || '3000';

const start = async (): Promise<void> => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
