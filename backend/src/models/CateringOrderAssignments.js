const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrderAssignments extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrderAssignments.attributes = attributes = {
  cateringOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringOrders', key: 'id' }
  },
  assignedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  assignmentType: {
    type: DataTypes.ENUM('preparation', 'delivery'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('assigned', 'in_progress', 'completed'),
    defaultValue: 'assigned'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  CateringOrderAssignments.init(CateringOrderAssignments.attributes, {
    sequelize,
    modelName: 'CateringOrderAssignments',
    tableName: 'cateringorderassignmentss', // Adjust this if needed
  });
  return CateringOrderAssignments
};