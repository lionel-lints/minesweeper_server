exports.seed = (knex, Promise) => {
  return knex.raw('ALTER SEQUENCE users_id_seq restart with 5;').then(() => {
    return Promise.join(
      knex('users').del(),
      knex('users').insert({
        id: 1,
        first_name: 'CJ',
        last_name: 'McSweejay',
        email: 'cj@example.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      }),
      knex('users').insert({
        id: 2,
        first_name: 'Lionel',
        last_name: '"Lintinator" Lints',
        email: 'lionel@example.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      }),
      knex('users').insert({
        id: 3,
        first_name: 'Chris',
        last_name: 'BurleyGuy',
        email: 'chris@example.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      }),
      knex('users').insert({
        id: 4,
        first_name: 'Adam',
        last_name: 'SwizzleStopper',
        email: 'adam@example.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      })
    );
  });
};
