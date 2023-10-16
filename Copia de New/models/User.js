const { Sequelize, DataTypes } = require("sequelize");
const hostname = '127.0.0.1';
const sequelize = new Sequelize('laravel', 'root', '', {
    host: hostname,
    port: 3307,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


  module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        name: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
        remember_token: DataTypes.TEXT
      });

    return User

}