module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: false,
    },
    tipAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tipType: {
      type: DataTypes.STRING, // e.g., 'fixed' or 'percentage'
      allowNull: false,
      validate: {
        isIn: [['fixed', 'percentage']],
      },
    },
    displayAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // For preset display amounts
    },
    minTipAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Optional minimum tip amount
    },
    maxTipAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Optional maximum tip amount
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Mark as the default tip for this location
    },
    serviceType: {
      type: DataTypes.STRING, // e.g., 'dine-in', 'delivery', 'pickup'
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // Status could be 'active', 'inactive'
    },
  });

  Tip.associate = (models) => {
    Tip.belongsTo(models.Client, { foreignKey: 'clientId' });
    Tip.belongsTo(models.Location, { foreignKey: 'locationId' });
    Tip.hasMany(models.Order, { foreignKey: 'tipId', allowNull: true });

    // New association for reporting
    Tip.hasMany(models.Report, { foreignKey: 'tipId', as: 'tipReports' });
  };

  return Tip;
};
