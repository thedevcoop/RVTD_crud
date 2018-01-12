const mysql = require("mysql");

const {
  user,
  host,
  database,
  password,
  port
} = require("../../secrets/db_configuration");

const pool = mysql.createPool({
  user,
  host,
  database,
  password,
  port
});

module.exports = pool;
