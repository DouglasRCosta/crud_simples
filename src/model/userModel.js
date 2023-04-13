const Sequelize = require("sequelize");
const { db } = require("../database/mysql/db");
const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
       autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    token:{
        type: Sequelize.DataTypes.STRING
    }
  },
  { timestamps: true }
);
User.sync() 
module.exports = User;
