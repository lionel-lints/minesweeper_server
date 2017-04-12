exports.seed = (knex, Promise) => {
  return knex.raw('ALTER SEQUENCE games_id_seq restart with 11;').then(() => {
    return Promise.join(
      knex('games').del(),
      knex('games').insert({
        id: 1,
        user_id: 1,
        completion_speed: '047',
        current_game: false,
        successfully_completed: true,
      }),
      knex('games').insert({
        id: 2,
        user_id: 1,
        completion_speed: '060',
        current_game: true,
        successfully_completed: false,
      }),
      knex('games').insert({
        id: 3,
        user_id: 1,
        completion_speed: '143',
        current_game: false,
        successfully_completed: true,
      }),
      knex('games').insert({
        id: 4,
        user_id: 2,
        completion_speed: '247',
        current_game: false,
        successfully_completed: true,
      }),
      knex('games').insert({
        id: 5,
        user_id: 2,
        completion_speed: '082',
        current_game: false,
        successfully_completed: true,
      }),
      knex('games').insert({
        id: 6,
        user_id: 2,
        completion_speed: '041',
        current_game: false,
        successfully_completed: false,
      }),
      knex('games').insert({
        id: 7,
        user_id: 3,
        completion_speed: '097',
        current_game: true,
        successfully_completed: false,
      }),
      knex('games').insert({
        id: 8,
        user_id: 3,
        completion_speed: '999',
        current_game: false,
        successfully_completed: true,
      }),
      knex('games').insert({
        id: 9,
        user_id: 3,
        completion_speed: '355',
        current_game: false,
        successfully_completed: false,
      }),
      knex('games').insert({
        id: 10,
        user_id: 2,
        completion_speed: '078',
        current_game: true,
        successfully_completed: false,
      })
    );
  });
};
