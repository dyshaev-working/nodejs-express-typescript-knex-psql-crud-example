const TABLE_NAME = 'tasks';

exports.up = knex => knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
    (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      priority INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE
    );
  `);

exports.down = knex => knex.schema.raw(`
  DROP TABLE IF EXISTS ${TABLE_NAME};
`);
