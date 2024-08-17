module.exports = (sequelize, DataTypes) => {
  const LocationHours = sequelize.define('LocationHours', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.INTEGER, // 0 = Sunday, 1 = Monday, etc.
      allowNull: false,
    },
    openTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    isTemporary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    effectiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });

  LocationHours.associate = (models) => {
    LocationHours.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return LocationHours;
};
