import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import Redis from 'ioredis';

export const prisma = new PrismaClient();

export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
});

export const connectMongoDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/api_nodejs_logs';
  try {
    await mongoose.connect(uri);
    console.log(' MongoDB connected successfully (Audit Logs database)');
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning:', (error as Error).message);
  }
};
