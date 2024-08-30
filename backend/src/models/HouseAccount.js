module.exports = (sequelize, DataTypes) => {
  const HouseAccount = sequelize.define('HouseAccount', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingType: {
      type: DataTypes.ENUM('Invoice', 'PO', 'Credit Card'),
      allowNull: false,
    },
    poNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isApprovedForPO: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isApprovedForInvoice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creditLimit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    paymentTerms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'HouseAccounts',
    timestamps: true,
  });

  HouseAccount.associate = (models) => {
    if (models.Client) {
      HouseAccount.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
    if (models.HouseAccountUser) {
      HouseAccount.hasMany(models.HouseAccountUser, { foreignKey: 'houseAccountId' });
    }
    if (models.Location) {
      HouseAccount.belongsToMany(models.Location, { through: 'HouseAccountLocations' });
    }
    if (models.CateringOrder) {
      HouseAccount.hasMany(models.CateringOrder, { foreignKey: 'houseAccountId' });
    }
    if (models.HouseAccountTransaction) {
      HouseAccount.hasMany(models.HouseAccountTransaction, { foreignKey: 'houseAccountId' });
    }
  };

  HouseAccount.prototype.calculateAvailableCredit = function () {
    return this.creditLimit - this.balance;
  };

  HouseAccount.prototype.updateBalance = async function (amount, transactionType) {
    if (transactionType === 'debit') {
      this.balance += amount;
    } else if (transactionType === 'credit') {
      this.balance -= amount;
    }
    await this.save();
  };

  return HouseAccount;
};
