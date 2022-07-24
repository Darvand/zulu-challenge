import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    database: {
      username: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      db: process.env.MONGO_DB,
      port: +process.env.MONGO_PORT,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
  };
});

export const configValidationSchema = Joi.object({
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_DB: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_CONNECTION: Joi.string().required(),
});
