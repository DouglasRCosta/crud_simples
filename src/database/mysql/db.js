const { Sequelize } = require("sequelize");
const config = require("./config/config");
const mysql = require("mysql2/promise");
const db = new Sequelize(config);
 

async function initialize() {
  const { host, port, username, password, database } = config;
  const connection = await mysql.createConnection({
    host: "localhost",
    port,
    user: username,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

}

module.exports = {db, initialize} ;
