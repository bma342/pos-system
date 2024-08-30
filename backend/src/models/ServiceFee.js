module.exports = (sequelize, DataTypes) => {
  const ServiceFee = sequelize.define('ServiceFee', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Providers',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feeAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    posSyncId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'ServiceFees',
    timestamps: true,
  });

  ServiceFee.associate = (models) => {
    ServiceFee.belongsTo(models.Location, { foreignKey: 'locationId' });
    ServiceFee.belongsTo(models.Provider, { foreignKey: 'providerId' });
  };

  return ServiceFee;
};
