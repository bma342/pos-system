const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    // ... (keep existing test configuration)
  },
  production: {
    // ... (keep existing production configuration)
  }
};

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

module.exports = sequelize;