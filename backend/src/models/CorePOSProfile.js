module.exports = (sequelize, DataTypes) => {
  const CorePOSProfile = sequelize.define('CorePOSProfile', {
    profileName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    integrationSettingsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PosIntegrationSettings',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    defaultAPISettings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    translationMapping: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    hardcodedSettings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['profileName']
      },
      {
        fields: ['integrationSettingsId']
      }
    ]
  });

  CorePOSProfile.associate = (models) => {
    CorePOSProfile.belongsTo(models.PosIntegrationSettings, { 
      foreignKey: 'integrationSettingsId', 
      onDelete: 'CASCADE' 
    });
    CorePOSProfile.hasMany(models.LocationPOSProfile, { 
      foreignKey: 'corePOSProfileId' 
    });
  };

  return CorePOSProfile;
};
