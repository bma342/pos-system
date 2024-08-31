const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'models');

const updateModelFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove duplicate BaseModel imports
  content = content.replace(/const BaseModel = require\(['"]\.\/BaseModel['"]\);?\n/g, '');
  
  // Add BaseModel import if it doesn't exist
  if (!content.includes("const BaseModel = require('./BaseModel');")) {
    content = "const BaseModel = require('./BaseModel');\n\n" + content;
  }

  // Update the class declaration
  content = content.replace(/class (\w+) extends (Model|BaseModel)/, 'class $1 extends BaseModel');

  // Remove ModelName.init call
  content = content.replace(/\w+\.init\([^)]+\);?\n/, '');

  // Update attributes definition
  content = content.replace(/(\w+)\.attributes = ({[\s\S]+?});/, (match, className, attributes) => {
    return `${className}.attributes = ${attributes};`;
  });

  // Update module exports
  content = content.replace(/module\.exports = \w+;/, (match, className) => {
    return `module.exports = (sequelize) => {
  ${className}.init(${className}.attributes, {
    sequelize,
    modelName: '${className}',
    tableName: '${className.toLowerCase()}s', // Adjust this to match your table naming convention
  });
  return ${className};
};`;
  });

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