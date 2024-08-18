module.exports = (sequelize, DataTypes) => {
  const HouseAccount = sequelize.define('HouseAccount', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingType: {
      type: DataTypes.ENUM('Invoice', 'PO'),
      allowNull: false,
    },
    poNumber: {
      type: DataTypes.STRING,
      allowNull: true, // Only required if billingType is 'PO'
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  HouseAccount.associate = (models) => {
    HouseAccount.belongsTo(models.Client, { foreignKey: 'clientId' });
    HouseAccount.hasMany(models.HouseAccountUser, { foreignKey: 'houseAccountId' });
    HouseAccount.belongsToMany(models.Location, { through: 'HouseAccountLocations' });
    HouseAccount.hasMany(models.CateringOrder, { foreignKey: 'houseAccountId' });
  };

  return HouseAccount;
};
