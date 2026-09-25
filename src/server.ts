import app from './app.js';
import { connectMongoDB } from './config/database.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error(' Failed to start server:', err);
  process.exit(1);
});
