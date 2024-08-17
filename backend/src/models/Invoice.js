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
      type: DataTypes.STRING, // e.g., 'corporate card', 'invoice', 'PO'
      allowNull: true,
    },
    generatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    Invoice.hasMany(models.Order, { foreignKey: 'invoiceId' });
  };

  return Invoice;
};
