const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pos',
  process.env.DB_USER || 'bryce',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'postgres',
  }
);

module.exports = sequelize;
