'use strict';

module.exports = (sequelize, DataTypes) => {
  const CorePOSProfiles = sequelize.define('CorePOSProfiles', {
    profileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'profileName', // Explicitly specify the column name
    },
    integrationSettingsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'integrationSettingsId', // Explicitly specify the column name
    },
    defaultAPISettings: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'defaultAPISettings', // Explicitly specify the column name
    },
    translationMapping: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'translationMapping', // Explicitly specify the column name
    },
    hardcodedSettings: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'hardcodedSettings', // Explicitly specify the column name
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'isActive', // Explicitly specify the column name
    },
  }, {
    tableName: 'CorePOSProfiles', // Specify the table name explicitly
  });

  CorePOSProfiles.associate = function(models) {
    CorePOSProfiles.belongsTo(models.PosIntegrationSettings, { 
      foreignKey: 'integrationSettingsId', 
      as: 'integrationSettings',
    });
  };

  return CorePOSProfiles;
};

