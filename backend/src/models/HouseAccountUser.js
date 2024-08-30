module.exports = (sequelize, DataTypes) => {
  const HouseAccountUser = sequelize.define('HouseAccountUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    canPlaceOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    canApproveInvoices: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    canPlacePOOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    spendingLimit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    approvalRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  }, {
    tableName: 'HouseAccountUsers',
    timestamps: true,
  });

  HouseAccountUser.associate = (models) => {
    if (models.User) {
      HouseAccountUser.belongsTo(models.User, { foreignKey: 'userId' });
    }
    if (models.HouseAccount) {
      HouseAccountUser.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    }
    if (models.Order) {
      HouseAccountUser.hasMany(models.Order, { foreignKey: 'houseAccountUserId' });
    }
  };

  return HouseAccountUser;
};
