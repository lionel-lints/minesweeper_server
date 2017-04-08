const knex = require('./knex');

function Users() {
  return knex('users');
}

function Stats() {
  return knex('stats');
}

module.exports = {
  Users,
  Stats,
};
