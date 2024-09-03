const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CorePOSProfile = sequelize.define('CorePOSProfile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posType: {
      type: DataTypes.ENUM('TOAST', 'BRINK', 'REVEL', 'SQUARE'),
      allowNull: false,
    },
    apiEndpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    syncInterval: {
      type: DataTypes.INTEGER,
      defaultValue: 3600,
    },
    lastSyncTimestamp: {
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    settings: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  }, {
    tableName: 'core_pos_profiles',
  });

  return CorePOSProfile;
};