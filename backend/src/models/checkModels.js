const fs = require('fs');
const path = require('path');

const modelsDir = __dirname;
const excludedFiles = [
  'Logger.js',
  'clientController.js',
  'index.js',
  'loyaltyService.js'
];

function checkModels() {
  fs.readdirSync(modelsDir).forEach(file => {
    // Check if the file is a JavaScript file and not in the excluded list
    if (file.indexOf('.') !== 0 && file.slice(-3) === '.js' && !excludedFiles.includes(file)) {
      try {
        console.log(`Checking model: ${file}`);
        const model = require(path.join(modelsDir, file));
        if (typeof model === 'function') {
          console.log(`Loaded model: ${model.name}`);
        } else {
          console.error(`Error loading model: ${file}: Model is not a function`);
        }
      } catch (error) {
        console.error(`Error loading model ${file}:`, error);
      }
    }
  });
}

checkModels();
