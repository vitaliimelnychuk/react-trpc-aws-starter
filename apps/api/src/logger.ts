import { APP_NAME, LOG_LEVEL } from '@api/config';
import pino from 'pino';

export const logger = pino({
  name: APP_NAME,
  level: LOG_LEVEL
});
