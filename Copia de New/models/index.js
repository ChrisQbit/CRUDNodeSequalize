const {Sequelize, DataTypes} = require('sequelize');
const hostname = '127.0.0.1';

const sequelize = new Sequelize('laravel', 'root', '', {
    host: hostname,
    port: 3307,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./User.js')(sequelize, DataTypes)
db.products = require('./Product.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})








module.exports = db
