require('dotenv').config(); // para poder leer las variables desde .env

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "database_minibus",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_minibus",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql"
  
  }
};
