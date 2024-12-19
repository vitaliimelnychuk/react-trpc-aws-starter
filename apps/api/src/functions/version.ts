import { APP_VERSION } from '@reacttrpc-starter/config';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: APP_VERSION
  };
};
