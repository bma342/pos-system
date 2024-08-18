module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
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
    tipAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tipType: {
      type: DataTypes.STRING, // e.g., 'fixed' or 'percentage'
      allowNull: false,
    },
    displayAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // For preset display amounts
    },
  });

  Tip.associate = (models) => {
    Tip.belongsTo(models.Client, { foreignKey: 'clientId' });
    Tip.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return Tip;
};
