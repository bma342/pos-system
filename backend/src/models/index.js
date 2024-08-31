'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Function to import a model
const importModel = (file) => {
  const model = require(path.join(__dirname, file));
  if (typeof model.init === 'function') {
    model.init(sequelize);
    db[model.name] = model;
    console.log(`Initialized model: ${model.name}`);
  } else {
    console.warn(`Skipped model: ${file} (not a Sequelize model or missing init method)`);
  }
};

// Import all models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 &&
      file !== 'BaseModel.js'
    );
  })
  .forEach(importModel);

// Set up associations
Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
    console.log(`Associations set up for: ${model.name}`);
  } else {
    console.log(`No associations for: ${model.name}`);
  }
});

// Handle connection errors
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;