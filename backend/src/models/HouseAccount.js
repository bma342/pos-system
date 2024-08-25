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
      allowNull: true, // Required only if billingType is 'PO'
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    isApprovedForPO: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates whether the account is approved for PO billing
    },
    isApprovedForInvoice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates whether the account is approved for invoice billing
    },
    creditLimit: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional credit limit for the house account
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    paymentTerms: {
      type: DataTypes.STRING, // E.g., 'Net 30', 'Net 60'
      allowNull: true,
    },
    approvalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending', // Status can be 'Pending', 'Approved', 'Rejected'
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional field to store additional notes or details
    },
  });

  HouseAccount.associate = (models) => {
    HouseAccount.belongsTo(models.Client, { foreignKey: 'clientId' });
    HouseAccount.hasMany(models.HouseAccountUser, { foreignKey: 'houseAccountId' });
    HouseAccount.belongsToMany(models.Location, { through: 'HouseAccountLocations' });
    HouseAccount.hasMany(models.CateringOrder, { foreignKey: 'houseAccountId' });

    // Associate with transaction history
    HouseAccount.hasMany(models.HouseAccountTransaction, { foreignKey: 'houseAccountId' });
  };

  // Business logic to calculate available credit
  HouseAccount.prototype.calculateAvailableCredit = function () {
    return this.creditLimit - this.balance;
  };

  // Business logic to update balance after a transaction
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

