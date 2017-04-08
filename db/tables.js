const knex = require('./knex');

function Users() {
  return knex('users');
}

function Games() {
  return knex('games');
}

module.exports = {
  Users,
  Games,
};
