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

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
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
db.CateringOrder = require('./CateringOrder')(sequelize, Sequelize);
db.Order = require('./Order')(sequelize, Sequelize);
db.OrderHistory = require('./OrderHistory')(sequelize, Sequelize);
db.HouseAccount = require('./HouseAccount')(sequelize, Sequelize);
db.HouseAccountUser = require('./HouseAccountUser')(sequelize, Sequelize);
db.Branding = require('./Branding')(sequelize, Sequelize);

// Define associations
db.Role.hasMany(db.User, { foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId' });

db.Guest.hasMany(db.Order, { foreignKey: 'guestId' });
db.Order.belongsTo(db.Guest, { foreignKey: 'guestId' });

db.Guest.hasMany(db.CateringOrder, { foreignKey: 'guestId' });
db.CateringOrder.belongsTo(db.Guest, { foreignKey: 'guestId' });

db.Order.hasMany(db.OrderHistory, { foreignKey: 'orderId' });
db.OrderHistory.belongsTo(db.Order, { foreignKey: 'orderId' });

db.CateringOrder.belongsTo(db.HouseAccount, { foreignKey: 'houseAccountId' });
db.Location.hasMany(db.Order, { foreignKey: 'locationId' });
db.Order.belongsTo(db.Location, { foreignKey: 'locationId' });

module.exports = db;
