import { Environment } from './env.validation';

export const getEnvFilePath = () => {
  const path = './config/';
  if (process.env.NODE_ENV === Environment.Production) return path + '.env';
  if (process.env.NODE_ENV === Environment.Development)
    return path + '.env.dev';
  if (process.env.NODE_ENV === Environment.Test) return path + '.env.test';
};
