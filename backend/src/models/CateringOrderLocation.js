module.exports = (sequelize, DataTypes) => {
  const CateringOrderLocation = sequelize.define('CateringOrderLocation', {
    cateringOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CateringOrders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    isCommissary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Indicates if the location is a commissary fulfilling the order
    },
  });

  CateringOrderLocation.associate = (models) => {
    CateringOrderLocation.belongsTo(models.CateringOrder, { foreignKey: 'cateringOrderId' });
    CateringOrderLocation.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return CateringOrderLocation;
};
