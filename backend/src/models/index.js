const { Sequelize, DataTypes } = require('sequelize');
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

const db = {};

// Import models
db.User = require('./User')(sequelize, DataTypes);
db.Role = require('./Role')(sequelize, DataTypes);
db.Permission = require('./Permission')(sequelize, DataTypes);
db.Client = require('./Client')(sequelize, DataTypes);
db.Location = require('./Location')(sequelize, DataTypes);
db.PosIntegration = require('./PosIntegration')(sequelize, DataTypes);
db.LoyaltyIntegration = require('./LoyaltyIntegration')(sequelize, DataTypes);
db.ProviderIntegration = require('./ProviderIntegration')(sequelize, DataTypes);
db.MenuGroup = require('./MenuGroup')(sequelize, DataTypes);
db.Modifier = require('./Modifier')(sequelize, DataTypes);
db.Menu = require('./Menu')(sequelize, DataTypes);
db.MenuItem = require('./MenuItem')(sequelize, DataTypes);
db.LocationMenuOverride = require('./LocationMenuOverride')(sequelize, DataTypes);
db.ProviderPricing = require('./ProviderPricing')(sequelize, DataTypes);
db.Guest = require('./Guest')(sequelize, DataTypes);
db.CateringOrder = require('./CateringOrder')(sequelize, DataTypes);
db.Order = require('./Order')(sequelize, DataTypes);
db.OrderHistory = require('./OrderHistory')(sequelize, DataTypes);
db.HouseAccount = require('./HouseAccount')(sequelize, DataTypes);
db.HouseAccountUser = require('./HouseAccountUser')(sequelize, DataTypes);
db.Branding = require('./Branding')(sequelize, DataTypes);

// Define associations
db.Role.hasMany(db.User, { foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId' });

db.Role.hasMany(db.Permission, { foreignKey: 'roleId' });
db.Permission.belongsTo(db.Role, { foreignKey: 'roleId' });

db.Client.hasMany(db.Location, { foreignKey: 'clientId' });
db.Location.belongsTo(db.Client, { foreignKey: 'clientId' });

db.Location.hasMany(db.Order, { foreignKey: 'locationId' });
db.Order.belongsTo(db.Location, { foreignKey: 'locationId' });

db.Guest.hasMany(db.Order, { foreignKey: 'guestId' });
db.Order.belongsTo(db.Guest, { foreignKey: 'guestId' });

db.Guest.hasMany(db.CateringOrder, { foreignKey: 'guestId' });
db.CateringOrder.belongsTo(db.Guest, { foreignKey: 'guestId' });

db.Order.hasMany(db.OrderHistory, { foreignKey: 'orderId' });
db.OrderHistory.belongsTo(db.Order, { foreignKey: 'orderId' });

db.CateringOrder.belongsTo(db.HouseAccount, { foreignKey: 'houseAccountId' });
db.HouseAccount.hasMany(db.CateringOrder, { foreignKey: 'houseAccountId' });

db.Location.hasMany(db.Menu, { foreignKey: 'locationId' });
db.Menu.belongsTo(db.Location, { foreignKey: 'locationId' });

db.Menu.hasMany(db.MenuGroup, { foreignKey: 'menuId' });
db.MenuGroup.belongsTo(db.Menu, { foreignKey: 'menuId' });

db.MenuGroup.hasMany(db.MenuItem, { foreignKey: 'menuGroupId' });
db.MenuItem.belongsTo(db.MenuGroup, { foreignKey: 'menuGroupId' });

db.MenuItem.hasMany(db.Modifier, { foreignKey: 'menuItemId' });
db.Modifier.belongsTo(db.MenuItem, { foreignKey: 'menuItemId' });

db.MenuItem.hasMany(db.ProviderPricing, { foreignKey: 'menuItemId' });
db.ProviderPricing.belongsTo(db.MenuItem, { foreignKey: 'menuItemId' });

db.Menu.hasMany(db.LocationMenuOverride, { foreignKey: 'menuId' });
db.LocationMenuOverride.belongsTo(db.Menu, { foreignKey: 'menuId' });

module.exports = db;
