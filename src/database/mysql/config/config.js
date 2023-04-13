module.exports = {
  database: process.env.DATABASE_MYSQL,
  username: process.env.USERNAME_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  dialect: process.env.DIALECT_MYSQL,
  host:'localhost',
  logging: false,
  sync: true,

};
