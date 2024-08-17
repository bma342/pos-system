module.exports = (sequelize, DataTypes) => {
  const HouseAccount = sequelize.define('HouseAccount', {
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingType: {
      type: DataTypes.ENUM('invoice', 'purchase_order'),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  HouseAccount.associate = (models) => {
    HouseAccount.belongsTo(models.Client, { foreignKey: 'clientId' });
    HouseAccount.hasMany(models.HouseAccountUser, { foreignKey: 'houseAccountId' });
  };

  return HouseAccount;
};
