const { Invoice, Order } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const generateInvoice = async (invoiceData) => {
  try {
    const newInvoice = await Invoice.create(invoiceData);
    logger.info(`New invoice generated with ID: ${newInvoice.id}`);
    return newInvoice;
  } catch (error) {
    logger.error('Error generating invoice:', error);
    throw new AppError('Failed to generate invoice', 500);
  }
};

const getInvoiceById = async (id) => {
  try {
    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Order, as: 'orders' }]
    });
    if (!invoice) {
      throw new AppError('Invoice not found', 404);
    }
    return invoice;
  } catch (error) {
    logger.error(`Error fetching invoice with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch invoice', 500);
  }
};

const getClientInvoices = async (clientId) => {
  try {
    return await Invoice.findAll({
      where: { clientId },
      include: [{ model: Order, as: 'orders' }]
    });
  } catch (error) {
    logger.error(`Error fetching invoices for client ${clientId}:`, error);
    throw new AppError('Failed to fetch client invoices', 500);
  }
};

const updateInvoice = async (id, invoiceData) => {
  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      throw new AppError('Invoice not found', 404);
    }
    const updatedInvoice = await invoice.update(invoiceData);
    logger.info(`Invoice updated with ID: ${id}`);
    return updatedInvoice;
  } catch (error) {
    logger.error(`Error updating invoice with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update invoice', 500);
  }
};

const deleteInvoice = async (id) => {
  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      throw new AppError('Invoice not found', 404);
    }
    await invoice.destroy();
    logger.info(`Invoice deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting invoice with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete invoice', 500);
  }
};

module.exports = {
  generateInvoice,
  getInvoiceById,
  getClientInvoices,
  updateInvoice,
  deleteInvoice
};