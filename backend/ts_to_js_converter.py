import os
import re

def ts_to_js(content):
    # Remove type annotations
    content = re.sub(r': \w+', '', content)
    content = re.sub(r'<\w+>', '', content)
    
    # Convert imports
    content = re.sub(r'import (.*) from ["\'](.*)["\'](;?)', r'const \1 = require("\2")\3', content)
    
    # Convert exports
    content = re.sub(r'export const', 'exports.', content)
    content = re.sub(r'export default', 'module.exports =', content)
    
    # Convert interface to JSDoc
    content = re.sub(r'interface (\w+) {([^}]*)}', r'/**\n * @typedef {Object} \1\n\2 */', content)
    
    # Convert type to JSDoc
    content = re.sub(r'type (\w+) =', r'/** @typedef', content)
    
    # Add basic JSDoc for functions
    content = re.sub(r'(async )?function (\w+)\((.*?)\)', r'/**\n * @param {Object} params\n */\n\1function \2(\3)', content)
    
    return content

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.ts'):
                file_path = os.path.join(root, file)
                new_file_path = file_path[:-3] + '.js'
                
                with open(file_path, 'r') as f:
                    content = f.read()
                
                new_content = ts_to_js(content)
                
                with open(new_file_path, 'w') as f:
                    f.write(new_content)
                
                os.remove(file_path)
                print(f"Converted {file_path} to {new_file_path}")

# Replace 'path/to/your/backend' with the actual path to your backend directory
backend_path = 'pos-system/backend'
process_directory(backend_path)

print("Conversion complete!")
