import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URI: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      APP_VERSION: string;
      LOG_LEVEL?: string;
    }
  }
}

const requiredEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REDIRECT_URI',
  'DATABASE_URL',
  'JWT_SECRET',
  'APP_VERSION'
];

requiredEnvVars.forEach((envVar) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const env = process.env;

export const APP_VERSION = env.APP_VERSION;

export const APP_NAME = 'api';

export const LOG_LEVEL = 'info';

export const JWT_SECRET = env.JWT_SECRET;

export const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = env.GOOGLE_REDIRECT_URI;
