const requiredEnvVars = ['REACT_APP_GOOGLE_CLIENT_ID', 'REACT_APP_API_URL'];

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_API_URL: string;
    }
  }
}

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const env = process.env;

export const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID as string;

export const API_URL = env.REACT_APP_API_URL as string;
