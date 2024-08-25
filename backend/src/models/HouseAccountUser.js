module.exports = (sequelize, DataTypes) => {
  const HouseAccountUser = sequelize.define('HouseAccountUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HouseAccounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    canPlaceOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Can this user place orders with the house account?
    },
    canApproveInvoices: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Can this user approve and submit invoices?
    },
    canPlacePOOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Can this user place orders using PO?
    },
    spendingLimit: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional limit on how much the user can spend per order
    },
    approvalRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if the user's orders need approval from another user
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // Status can be 'active', 'suspended', etc.
    },
  });

  HouseAccountUser.associate = (models) => {
    HouseAccountUser.belongsTo(models.User, { foreignKey: 'userId' });
    HouseAccountUser.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });

    // Associate with approval workflows or chains if needed
    HouseAccountUser.hasMany(models.Order, { foreignKey: 'houseAccountUserId' });
  };

  return HouseAccountUser;
};
