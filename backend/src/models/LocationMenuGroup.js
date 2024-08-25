module.exports = (sequelize, DataTypes) => {
  const LocationMenuGroup = sequelize.define('LocationMenuGroup', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    menuGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuGroups',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    priceOverride: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null, // Optional price override specific to this location
    },
    availabilityStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'available', // Status could be 'available', 'unavailable', 'out-of-stock'
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional uplift specific to this location
    },
    customDisplayName: {
      type: DataTypes.STRING,
      allowNull: true, // Allows custom naming for specific locations
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0, // Controls the display order within the location
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Flag to feature the group at this location
    },
  });

  LocationMenuGroup.associate = (models) => {
    LocationMenuGroup.belongsTo(models.Location, { foreignKey: 'locationId' });
    LocationMenuGroup.belongsTo(models.MenuGroup, { foreignKey: 'menuGroupId' });

    // Add any additional associations here as needed.
  };

  return LocationMenuGroup;
};
