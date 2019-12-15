module.exports = {
  app: {
    port: '3000',
  },
  knex: {
    client: 'pg',
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      directory: 'sql/migrations',
      tableName: '__migrations',
    },
    seeds: {
      directory: 'sql/seeds',
    },
    wrapIdentifier: (value, origImpl) => origImpl(toSnakeCase(value)),
    // overly simplified snake_case -> camelCase converter
    postProcessResponse: (result) => {
      if (Array.isArray(result)) {
        return result
          .map(pipe(
            row => mapKeys(row, (v, k) => camelCase(k)),
            map(cond([
              [
                pipe(type, equals('Object')),
                row => mapKeys(row, (v, k) => camelCase(k)),
              ],
              [
                pipe(type, equals('Array')),
                map(when(
                  pipe(type, equals('Object')),
                  row => mapKeys(row, (v, k) => camelCase(k)),
                )),
              ],
              [T, identity],
            ])),
          ));
      }

      if (result.rows) {
        return result.rows.map(row => mapKeys(row, (v, k) => camelCase(k)));
      }

      return mapKeys(result, (v, k) => camelCase(k));
    },
  },
};
