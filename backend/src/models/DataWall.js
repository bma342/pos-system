module.exports = (sequelize, DataTypes) => {
  const DataWall = sequelize.define('DataWall', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessLevel: {
      type: DataTypes.ENUM('admin', 'manager', 'viewer'), // Define different access levels
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    reportId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reports',
        key: 'id',
      },
    },
    permissions: {
      type: DataTypes.JSONB, // Define custom permission logic for data walls
      allowNull: false,
    },
  });

  DataWall.associate = (models) => {
    DataWall.belongsTo(models.Location, { foreignKey: 'locationId' });
    DataWall.belongsTo(models.Report, { foreignKey: 'reportId' });
  };

  return DataWall;
};
