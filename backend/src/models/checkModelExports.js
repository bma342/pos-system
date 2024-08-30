const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development; // Adjust this path if your config is located elsewhere

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelsDir = path.join(__dirname);

fs.readdirSync(modelsDir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (file !== path.basename(__filename));
  })
  .forEach(file => {
    try {
      console.log(`Checking model: ${file}`);
      const modelPath = path.join(modelsDir, file);
      const modelDefinition = require(modelPath);

      // Check if model is exporting a function
      if (typeof modelDefinition !== 'function') {
        throw new Error(`Model ${file} does not export a function.`);
      }

      // Check if model is correctly defined
      const model = modelDefinition(sequelize, DataTypes);

      if (!model || typeof model !== 'object' || !model.associate) {
        console.log(`Model ${file} is loaded successfully.`);
      } else {
        console.log(`Model ${file} loaded and has associations.`);
      }
    } catch (error) {
      console.error(`Error in model ${file}: ${error.message}`);
    }
  });

sequelize.close();
