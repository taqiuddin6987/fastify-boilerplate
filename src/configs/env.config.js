import { Type } from '@sinclair/typebox';

const ENV_SCHEMA = Type.Object({
  WEB_SERVER_PORT: Type.Integer({
    maximum: 65535,
    minimum: 1000,
  }),
  WEB_SERVER_PROTOCOL: Type.String(),
  WEB_SERVER_HOST: Type.String(),
  WEB_SERVER_BASEPATH: Type.String(),

  DB_USER: Type.String(),
  DB_PASSWORD: Type.String(),
  DB_HOST: Type.String(),
  DB_PORT: Type.Integer({
    maximum: 65535,
    minimum: 1000,
  }),
  DATABASE: Type.String(),

  ACCESS_JWT_SECRET: Type.String(),
  ACCESS_JWT_EXPIRES_IN: Type.String(),
  REFRESH_JWT_SECRET: Type.String(),
  REFRESH_JWT_EXPIRES_IN: Type.String(),

  REDIS_CLIENT_PORT: Type.Integer({
    maximum: 65535,
    minimum: 1000,
  }),
  REDIS_CLIENT_HOST: Type.String(),

  S3_REGION: Type.String(),
  S3_ACCESS_ID: Type.String(),
  S3_ACCESS_KEY: Type.String(),
  S3_BUCKET: Type.String(),

  SENDGRID_API_KEY: Type.String(),
  SENDGRID_MAIL_FROM: Type.String(),
});

function envConfig() {
  return {
    confKey: 'config',
    dotenv: {
      path: `.env.${process.env.NODE_ENV}`,
    },
    ajv: {
      customOptions: (ajv) => ajv.addSchema({ coerceTypes: true }),
    },
    schema: ENV_SCHEMA,
  };
}

export default envConfig;
