const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class StaffRole extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

StaffRole.attributes = attributes = {
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Staff', key: 'id' }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Roles', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  StaffRole.init(StaffRole.attributes, {
    sequelize,
    modelName: 'StaffRole',
    tableName: 'staffroles', // Adjust this if needed
  });
  return StaffRole
};