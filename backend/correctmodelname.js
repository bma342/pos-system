const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'models');

fs.readdir(modelsDir, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach((file, index) => {
    if (file.endsWith('.js') && file !== 'index.js' && file !== 'BaseModel.js') {
      const filePath = path.join(modelsDir, file);
      
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        // Remove the line that sets the name property
        const updatedContent = content.replace(/^.*\.name = '.*';$/m, '');

        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
          } else {
            console.log(`Successfully updated ${file}`);
          }
        });
      });
    }
  });
});