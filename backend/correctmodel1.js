const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'models');

const updateModelFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already has the new structure
  if (content.includes('static attributes =')) {
    console.log(`Skipping ${filePath} as it already has the new structure.`);
    return;
  }

  const updatedContent = content
    .replace(/const { Model, DataTypes } = require\('sequelize'\);/, "const { DataTypes } = require('sequelize');")
    .replace(/class \w+ extends Model/, "class $& extends BaseModel")
    .replace(/(\w+)\.init\(([\s\S]*?)\);/, (match, className, attributes) => {
      return `${className}.attributes = ${attributes.trim()};`;
    })
    .replace(/sequelize,\s*modelName:[^}]+},?/, '')
    .replace(/(\w+)\.name = ['"](\w+)['"];/, '');

  const baseModelImport = "const BaseModel = require('./BaseModel');\n\n";
  const updatedContentWithImport = baseModelImport + updatedContent;

  fs.writeFileSync(filePath, updatedContentWithImport);
  console.log(`Updated ${filePath}`);
};

fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js') && file !== 'index.js' && file !== 'BaseModel.js') {
    const filePath = path.join(modelsDir, file);
    updateModelFile(filePath);
  }
});

console.log('All model files have been updated.');