const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ServiceFee = sequelize.define('ServiceFee', {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations',
      key: 'id',
    },
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Providers',
      key: 'id',
    },
  },
  orderType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feeAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  posSyncId: {
    type: DataTypes.STRING, // Generalized POS sync ID to handle multiple systems
    allowNull: true,
  },
}, {
  timestamps: true,
});

ServiceFee.associate = (models) => {
  ServiceFee.belongsTo(models.Location, { foreignKey: 'locationId' });
  ServiceFee.belongsTo(models.Provider, { foreignKey: 'providerId' });
};

module.exports = ServiceFee;
