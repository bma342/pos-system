convert_file() {
    file="$1"
    js_file="${file%.ts}.js"
    
    # Remove type annotations
    sed 's/: [A-Za-z<>|&]\+//g' "$file" > "$js_file"
    
    # Replace import statements
    sed -i 's/import \(.*\) from/const \1 = require/g' "$js_file"
    
    # Replace export statements
    sed -i 's/export const/const/g' "$js_file"
    sed -i 's/export default/module.exports =/g' "$js_file"
    sed -i 's/export {/module.exports = {/g' "$js_file"
    
    # Remove interface and type declarations
    sed -i '/^interface /d' "$js_file"
    sed -i '/^type /d' "$js_file"
    
    # Remove other TypeScript-specific syntax
    sed -i 's/as [A-Za-z]\+//g' "$js_file"
    
    echo "Converted $file to $js_file"
}

# Find and convert all TypeScript files
find src -name "*.ts" | while read file; do
    convert_file "$file"
    # Remove the original .ts file
    rm "$file"
    echo "Deleted original TypeScript file: $file"
done

echo "Conversion complete. All .ts files have been converted to .js and original .ts files have been deleted."
