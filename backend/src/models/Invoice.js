const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Invoice extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Invoice.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  houseAccountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'HouseAccounts', key: 'id' }
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Orders', key: 'id' }
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'overdue', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  paidDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Invoice.init(Invoice.attributes, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoices', // Adjust this if needed
  });
  return Invoice
};