const { Invoice } = require('../models'); // Added import for Invoice model

const calculateAccountBalance = async (houseAccountId) => {
  const invoices = await Invoice.findAll({ where: { houseAccountId } });
  const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  return total;
};

const generateInvoiceNumber = () => {
  return `INV-${Date.now()}`;
};

module.exports = { calculateAccountBalance, generateInvoiceNumber };
