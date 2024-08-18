module.exports = (sequelize, DataTypes) => {
  const ServiceFee = sequelize.define('ServiceFee', {
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    feeAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    feeType: {
      type: DataTypes.STRING, // e.g., 'fixed' or 'percentage'
      allowNull: false,
    },
  });

  ServiceFee.associate = (models) => {
    ServiceFee.belongsTo(models.Client, { foreignKey: 'clientId' });
    ServiceFee.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return ServiceFee;
};
