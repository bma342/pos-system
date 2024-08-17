const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Load .env file from the correct directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Loaded DB Config:', {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Optional: Disable SQL logging for cleaner output
});

// Define a placeholder object to store models
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models and assign them to the db object
db.User = require('./User')(sequelize, Sequelize);
db.Role = require('./Role')(sequelize, Sequelize);
db.Permission = require('./Permission')(sequelize, Sequelize);
db.Client = require('./Client')(sequelize, Sequelize);
db.Location = require('./Location')(sequelize, Sequelize);
db.PosIntegration = require('./PosIntegration')(sequelize, Sequelize);
db.LoyaltyIntegration = require('./LoyaltyIntegration')(sequelize, Sequelize);
db.ProviderIntegration = require('./ProviderIntegration')(sequelize, Sequelize);
db.MenuGroup = require('./MenuGroup')(sequelize, Sequelize);
db.Modifier = require('./Modifier')(sequelize, Sequelize);
db.Menu = require('./Menu')(sequelize, Sequelize);
db.MenuItem = require('./MenuItem')(sequelize, Sequelize);
db.LocationMenuOverride = require('./LocationMenuOverride')(sequelize, Sequelize);
db.ProviderPricing = require('./ProviderPricing')(sequelize, Sequelize);
db.Guest = require('./Guest')(sequelize, Sequelize);

// Define associations
db.Role.hasMany(db.User, { foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId' });

module.exports = db;
