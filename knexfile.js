import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, `.env.${process.env['NODE_ENV']}`),
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    timezone: 'UTC',
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: function (connection, done) {
      connection.query(`SET TIME ZONE 'UTC'`, function (error) {
        if (error) {
          done(error, connection);
        }
        done(false, connection);
      });
    },
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
export const staging = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    timezone: 'UTC',
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: function (connection, done) {
      connection.query(`SET TIME ZONE 'UTC'`, function (error) {
        if (error) {
          done(error, connection);
        }
        done(false, connection);
      });
    },
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
export const production = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    timezone: 'UTC',
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: function (connection, done) {
      connection.query(`SET TIME ZONE 'UTC'`, function (error) {
        if (error) {
          done(error, connection);
        }
        done(false, connection);
      });
    },
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
