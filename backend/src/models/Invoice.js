module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'overdue'),
      allowNull: false,
      defaultValue: 'pending',
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    generatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Invoices',
    timestamps: true,
  });

  Invoice.associate = (models) => {
    if (models.HouseAccount) {
      Invoice.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    }
    if (models.Order) {
      Invoice.hasMany(models.Order, { foreignKey: 'invoiceId' });
    }
  };

  return Invoice;
};
