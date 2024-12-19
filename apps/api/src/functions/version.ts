import { APP_VERSION } from '@api/config';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: APP_VERSION
  };
};
