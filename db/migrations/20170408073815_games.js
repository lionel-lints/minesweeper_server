exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(table){
    table.increments();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade');
    table.text('completion_speed').notNullable().defaultTo('');
    table.boolean('current_game').notNullable().defaultTo(true);
    table.boolean('successfully_completed').notNullable().defaultTo(false);
    table.timestamps(true, true);
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');
};
