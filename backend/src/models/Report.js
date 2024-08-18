module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    reportType: {
      type: DataTypes.STRING, // E.g., 'sales', 'inventory', 'loyalty'
      allowNull: false,
    },
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
    generatedData: {
      type: DataTypes.JSONB,
      allowNull: false, // Stores the actual report data securely
    },
  });

  Report.associate = (models) => {
    Report.belongsTo(models.Client, { foreignKey: 'clientId' });
    Report.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return Report;
};
