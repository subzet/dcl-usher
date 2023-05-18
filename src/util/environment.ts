import dotenv from 'dotenv';

dotenv.config();

export function getEnvironment<T = string>(key: string, defaultValue?: T): T {
  return (process.env[key] ?? defaultValue ?? '') as T;
}

export const environment = {
  NODE_ENV: getEnvironment('NODE_ENV', 'development'),
  GIT_SHA: getEnvironment('GIT_SHA'),
  DEMO: getEnvironment('DEMO') === 'true',
  LOCAL: false,
  DEV: false,
  TEST: false,
  PROD: false,
  MONGO_DATABASE_URL: getEnvironment(
    'MONGO_DATABASE_URL',
    'mongodb://mongouser:mongopass@localhost:27017/split_local?authSource=admin'
  ),
  MONGO_DATABASE_URL_LOCAL:
    'mongodb://mongouser:mongopass@localhost:27017/split_local?authSource=admin',
  PORT: 8080,
  S3_SECRET_KEY: getEnvironment('S3_SECRET_KEY'),
  S3_ACCESS_KEY: getEnvironment('S3_ACCESS_KEY'),
  S3_BUCKET: getEnvironment('S3_BUCKET'),
  S3_ACCOUNT_ID: getEnvironment('S3_ACCOUNT_ID'),
};

environment.LOCAL = !environment.GIT_SHA;
environment.TEST = process.env.NODE_ENV === 'test';
