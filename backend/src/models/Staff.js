const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Staff extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Staff.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hireDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Staff.init(Staff.attributes, {
    sequelize,
    modelName: 'Staff',
    tableName: 'staffs', // Adjust this if needed
  });
  return Staff
};