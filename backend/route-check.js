const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'models');
const routesDir = path.join(__dirname, 'src', 'routes');
const controllersDir = path.join(__dirname, 'src', 'controllers');

function getFiles(dir) {
  return fs.readdirSync(dir).filter(file => file.endsWith('.js') && file !== 'index.js');
}

function checkRoutesMethods(routeFile) {
  const content = fs.readFileSync(path.join(routesDir, routeFile), 'utf8');
  const methods = ['get', 'post', 'put', 'patch', 'delete'].filter(method => content.includes(`router.${method}`));
  return methods;
}

function checkControllerMethods(controllerFile) {
  const content = fs.readFileSync(path.join(controllersDir, controllerFile), 'utf8');
  const methods = ['index', 'show', 'create', 'update', 'destroy'].filter(method => content.includes(`${method}:`));
  return methods;
}

const models = getFiles(modelsDir);
const routes = getFiles(routesDir);
const controllers = getFiles(controllersDir);

console.log('Model Check Report:');
console.log('==================');

models.forEach(model => {
  const modelName = path.parse(model).name.toLowerCase();
  console.log(`\nModel: ${modelName}`);
  
  const routeFile = routes.find(route => route.toLowerCase().includes(modelName));
  if (routeFile) {
    console.log(`  Route file: ${routeFile}`);
    const routeMethods = checkRoutesMethods(routeFile);
    console.log(`  Route methods: ${routeMethods.join(', ')}`);
  } else {
    console.log(`  Route file: Missing`);
  }
  
  const controllerFile = controllers.find(controller => controller.toLowerCase().includes(modelName));
  if (controllerFile) {
    console.log(`  Controller file: ${controllerFile}`);
    const controllerMethods = checkControllerMethods(controllerFile);
    console.log(`  Controller methods: ${controllerMethods.join(', ')}`);
  } else {
    console.log(`  Controller file: Missing`);
  }
});

console.log('\nMissing Routes or Controllers:');
console.log('==============================');
models.forEach(model => {
  const modelName = path.parse(model).name.toLowerCase();
  if (!routes.some(route => route.toLowerCase().includes(modelName))) {
    console.log(`Missing route for model: ${modelName}`);
  }
  if (!controllers.some(controller => controller.toLowerCase().includes(modelName))) {
    console.log(`Missing controller for model: ${modelName}`);
  }
});

console.log('\nUnused Routes or Controllers:');
console.log('==============================');
routes.forEach(route => {
  const routeName = path.parse(route).name.toLowerCase();
  if (!models.some(model => routeName.includes(path.parse(model).name.toLowerCase()))) {
    console.log(`Potential unused route: ${route}`);
  }
});
controllers.forEach(controller => {
  const controllerName = path.parse(controller).name.toLowerCase();
  if (!models.some(model => controllerName.includes(path.parse(model).name.toLowerCase()))) {
    console.log(`Potential unused controller: ${controller}`);
  }
});
