const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'models');

const updateModelFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove unexpected semicolons
  content = content.replace(/;\s*\};/g, '\n};');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
};

fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js') && file !== 'index.js' && file !== 'BaseModel.js') {
    const filePath = path.join(modelsDir, file);
    updateModelFile(filePath);
  }
});

console.log('All model files have been updated.');