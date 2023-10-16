const { Sequelize, DataTypes } = require("sequelize");
const hostname = '127.0.0.1';
const sequelize = new Sequelize('laravel', 'root', '', {
    host: hostname,
    port: 3307,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


  module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("products", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        name: DataTypes.TEXT,
        detail: DataTypes.TEXT,
        price: DataTypes.TEXT,
        image: DataTypes.TEXT
      });

    return Product

}