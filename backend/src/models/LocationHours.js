module.exports = (sequelize, DataTypes) => {
  const LocationHours = sequelize.define('LocationHours', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, // To define when temporary hours should end
    },
  });

  LocationHours.associate = (models) => {
    LocationHours.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  LocationHours.addHook('afterUpdate', async (locationHours, options) => {
    if (locationHours.isTemporary && locationHours.endDate) {
      const now = new Date();
      if (new Date(locationHours.endDate) < now) {
        await locationHours.update(
          { 
            isTemporary: false, 
            effectiveDate: null, 
            endDate: null 
          }, 
          { 
            transaction: options.transaction,
            hooks: false // Prevent infinite loop
          }
        );
      }
    }
  });

  return LocationHours;
};
