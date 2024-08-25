module.exports = (sequelize, DataTypes) => {
  const CateringSettings = sequelize.define('CateringSettings', {
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    serviceCharges: {
      type: DataTypes.JSONB, // Store service charges and configurations
      allowNull: true,
    },
    deliveryProviders: {
      type: DataTypes.JSONB, // Store list of available delivery providers
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: false,
    },
  });

  CateringSettings.associate = (models) => {
    CateringSettings.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return CateringSettings;
};
