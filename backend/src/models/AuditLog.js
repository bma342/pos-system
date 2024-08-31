const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class AuditLog extends BaseModel {
  static associate(models) {
    // define associations here if needed
  }
}

AuditLog.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

module.exports = (sequelize) => {
  AuditLog.init(AuditLog.attributes, {
    sequelize,
    modelName: 'AuditLog',
    tableName: 'auditlogs', // Adjust this if needed
  });
  return AuditLog
};