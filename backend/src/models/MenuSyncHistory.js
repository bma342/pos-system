module.exports = (sequelize, DataTypes) => {
  const MenuSyncHistory = sequelize.define('MenuSyncHistory', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    syncStatus: {
      type: DataTypes.STRING, // Possible values: 'success', 'failure'
      allowNull: false,
    },
    syncDetails: {
      type: DataTypes.JSONB, // Detailed response from the POS system or error details
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  MenuSyncHistory.associate = (models) => {
    MenuSyncHistory.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return MenuSyncHistory;
};
