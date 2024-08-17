const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pos',
  process.env.DB_USER || 'bryce',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'postgres',
    logging: false, // set to console.log to see the raw SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
);

module.exports = sequelize;
