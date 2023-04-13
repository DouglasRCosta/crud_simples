const Sequelize = require('sequelize')
const {db} = require('../database/mysql/db')
const Post = db.define('post',{
    id:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    like:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    content:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    user:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    }
},{    timestamps: true,})
Post.sync()
module.exports = Post