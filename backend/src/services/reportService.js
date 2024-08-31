const { Report } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const generateReport = async (reportData) => {
  try {
    const newReport = await Report.create(reportData);
    logger.info(`New report generated with ID: ${newReport.id}`);
    return newReport;
  } catch (error) {
    logger.error('Error generating report:', error);
    throw new AppError('Failed to generate report', 500);
  }
};

const getReportById = async (id) => {
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      throw new AppError('Report not found', 404);
    }
    return report;
  } catch (error) {
    logger.error(`Error fetching report with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch report', 500);
  }
};

const getClientReports = async (clientId) => {
  try {
    return await Report.findAll({ where: { clientId } });
  } catch (error) {
    logger.error(`Error fetching reports for client ${clientId}:`, error);
    throw new AppError('Failed to fetch client reports', 500);
  }
};

const updateReport = async (id, reportData) => {
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      throw new AppError('Report not found', 404);
    }
    const updatedReport = await report.update(reportData);
    logger.info(`Report updated with ID: ${id}`);
    return updatedReport;
  } catch (error) {
    logger.error(`Error updating report with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update report', 500);
  }
};

const deleteReport = async (id) => {
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      throw new AppError('Report not found', 404);
    }
    await report.destroy();
    logger.info(`Report deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting report with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete report', 500);
  }
};

module.exports = {
  generateReport,
  getReportById,
  getClientReports,
  updateReport,
  deleteReport
};

