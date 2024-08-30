'use strict';

module.exports = (sequelize, DataTypes) => {
  const PosIntegrationSettings = sequelize.define('PosIntegrationSettings', {
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    apiUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiVersion: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'v1',
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestHeaders: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    requestMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'POST',
    },
    authType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endpointMappings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    syncFrequency: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'daily',
    },
    errorHandling: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'PosIntegrationSettings'
  });

  PosIntegrationSettings.associate = function(models) {
    PosIntegrationSettings.hasMany(models.CorePOSProfiles, {
      foreignKey: 'integrationSettingsId',
      as: 'coreProfiles'
    });
  };

  return PosIntegrationSettings;
};
