const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

console.log('DB Config:', { name: DB_NAME, user: DB_USER, password: '****', host: DB_HOST });

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = {
  sequelize,
  Sequelize
};
