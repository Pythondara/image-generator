import * as process from 'process';
import { ConfigVariables } from './dto';

export default (): ConfigVariables => ({
  host: process.env.HOST || '0.0.0.0',
  port: +process.env.PORT,
  swaggerFolder: './storage/docs',
  logLevel: process.env.LOG_LEVEL,
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    databaseUrl: process.env.DATABASE_URL,
  },
  minio: {
    host: process.env.MINIO_HOST,
    port: +process.env.MINIO_PORT || 9001,
    username: process.env.MINIO_USERNAME,
    password: process.env.MINIO_PASSWORD,
    endPoint: process.env.MINIO_ENDPOINT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  },
  fusionBrain: {
    secretKey: process.env.FUSION_BRAIN_SECRET_KEY,
    apiKey: process.env.FUSION_BRAIN_API_KEY,
    url: process.env.FUSION_BRAIN_URL,
  },
});
