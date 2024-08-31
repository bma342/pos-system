const invoiceService = require('../services/invoiceService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.generateInvoice = async (req, res, next) => {
  try {
    const invoice = await invoiceService.generateInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    logger.error('Error generating invoice:', error);
    next(new AppError('Failed to generate invoice', 500));
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    if (!invoice) {
      return next(new AppError('Invoice not found', 404));
    }
    res.status(200).json(invoice);
  } catch (error) {
    logger.error(`Error fetching invoice ${req.params.id}:`, error);
    next(error);
  }
};

exports.getClientInvoices = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getClientInvoices(req.params.clientId);
    res.status(200).json(invoices);
  } catch (error) {
    logger.error(`Error fetching invoices for client ${req.params.clientId}:`, error);
    next(error);
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const updatedInvoice = await invoiceService.updateInvoice(req.params.id, req.body);
    if (!updatedInvoice) {
      return next(new AppError('Invoice not found', 404));
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    logger.error(`Error updating invoice ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const result = await invoiceService.deleteInvoice(req.params.id);
    if (!result) {
      return next(new AppError('Invoice not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting invoice ${req.params.id}:`, error);
    next(error);
  }
};