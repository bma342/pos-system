'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    !['checkModelExports.js', 'checkModels.js', 'Logger.js'].includes(file)
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    if (typeof model === 'function') {
      db[path.parse(file).name] = model(sequelize, Sequelize.DataTypes);
    } else if (model.name && typeof model.init === 'function') {
      db[model.name] = model.init(sequelize, Sequelize.DataTypes);
    } else {
      console.warn(`Warning: ${file} does not export a valid Sequelize model`);
    }
  });

Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
