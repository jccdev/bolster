import knex from 'knex';

export function getDb() {
    return knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: 5432,
            database: 'bolster',
        },
    });
}
