module.exports = (sequelize, DataTypes) => {
  const LocationTaxConfig = sequelize.define('LocationTaxConfig', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    taxIdNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'LocationTaxConfigs',
    timestamps: true,
  });

  LocationTaxConfig.associate = (models) => {
    LocationTaxConfig.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return LocationTaxConfig;
};
