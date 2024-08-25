module.exports = (sequelize, DataTypes) => {
  const TipConfiguration = sequelize.define('TipConfiguration', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    presetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Optional preset fixed tip amount
    },
    presetPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true, // Optional preset tip percentage
    },
    customTipAllowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Allow or disallow custom tip entry
    },
    defaultTipOption: {
      type: DataTypes.ENUM('amount', 'percentage', 'none'),
      defaultValue: 'none', // Set the default tip option for this configuration
    },
    roundingOption: {
      type: DataTypes.ENUM('none', 'up', 'down', 'nearest'),
      defaultValue: 'none', // Rounding option for tip values
    },
    serviceSpecificTips: {
      type: DataTypes.JSONB, // Store tip configurations for different service types (e.g., dine-in, delivery)
      allowNull: true,
    },
    tipSharingEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Enable or disable tip sharing
    },
  });

  TipConfiguration.associate = (models) => {
    TipConfiguration.belongsTo(models.Client, { foreignKey: 'clientId' });
    TipConfiguration.belongsTo(models.Location, { foreignKey: 'locationId' });
    TipConfiguration.hasMany(models.Tip, { foreignKey: 'tipConfigurationId', as: 'tips' }); // Link to individual tips
  };

  return TipConfiguration;
};
