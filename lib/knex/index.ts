import * as config from 'config';
import * as knexLib from 'knex';

const KNEX: Object = config.get('knex');

const knex = knexLib({
  ...KNEX,
  connection: {
    user: process.env.POSTGRES_USER || 'test',
    database: process.env.POSTGRES_DB || 'test',
    password: process.env.POSTGRES_PASSWORD || 'test',
    host: process.env.POSTGRES_HOST || 'postgres',
  },
});

export default knex;
