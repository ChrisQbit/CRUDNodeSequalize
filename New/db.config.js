module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "",
    DB: "laravel",
    dialect: "mysql", 
    port: 3307,
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    };