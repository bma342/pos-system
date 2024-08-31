const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ScheduledOrder extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ScheduledOrder.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Orders', key: 'id' }
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  recurrence: {
    type: DataTypes.JSON,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  ScheduledOrder.init(ScheduledOrder.attributes, {
    sequelize,
    modelName: 'ScheduledOrder',
    tableName: 'scheduledorders', // Adjust this if needed
  });
  return ScheduledOrder
};