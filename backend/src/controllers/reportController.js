const reportService = require('../services/reportService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.generateReport = async (req, res, next) => {
  try {
    const report = await reportService.generateReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    logger.error('Error generating report:', error);
    next(new AppError('Failed to generate report', 500));
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    if (!report) {
      return next(new AppError('Report not found', 404));
    }
    res.status(200).json(report);
  } catch (error) {
    logger.error(`Error fetching report ${req.params.id}:`, error);
    next(error);
  }
};

exports.getClientReports = async (req, res, next) => {
  try {
    const reports = await reportService.getClientReports(req.params.clientId);
    res.status(200).json(reports);
  } catch (error) {
    logger.error(`Error fetching reports for client ${req.params.clientId}:`, error);
    next(error);
  }
};

exports.updateReport = async (req, res, next) => {
  try {
    const updatedReport = await reportService.updateReport(req.params.id, req.body);
    if (!updatedReport) {
      return next(new AppError('Report not found', 404));
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    logger.error(`Error updating report ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const result = await reportService.deleteReport(req.params.id);
    if (!result) {
      return next(new AppError('Report not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting report ${req.params.id}:`, error);
    next(error);
  }
};