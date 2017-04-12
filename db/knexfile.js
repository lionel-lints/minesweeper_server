const path = require('path');

require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/minesweeper_server',
  },
  /* Possible future test environment.
  test: {
    client: 'pg',
    connection: 'postgres://localhost/mine_sweeper_test',
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    seeds: {
      directory: path.join(__dirname, './seeds'),
    },
  },
  */
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
