import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const projectRoot = './src';

function getTypeReferences(sourceFile: ts.SourceFile): Set<string> {
  const typeReferences = new Set<string>();

  function visit(node: ts.Node) {
    if (ts.isTypeReferenceNode(node)) {
      typeReferences.add(node.typeName.getText());
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return typeReferences;
}

function scanDirectory(directory: string): void {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      scanDirectory(filePath);
    } else if (stats.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      const sourceFile = ts.createSourceFile(
        filePath,
        fs.readFileSync(filePath, 'utf-8'),
        ts.ScriptTarget.Latest,
        true
      );

      const typeRefs = getTypeReferences(sourceFile);
      console.log(`File: ${filePath}`);
      console.log('Type references:', Array.from(typeRefs));
      console.log('---');
    }
  });
}

scanDirectory(projectRoot);
