const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class TaxRate extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

TaxRate.attributes = attributes = {
  taxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Taxes', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Locations', key: 'id' }
  },
  rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  TaxRate.init(TaxRate.attributes, {
    sequelize,
    modelName: 'TaxRate',
    tableName: 'taxrates', // Adjust this if needed
  });
  return TaxRate
};