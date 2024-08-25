const reportService = require('../services/reportService');
const logger = require('../services/logger');

// Generate a report based on type
exports.generateReport = async (req, res) => {
  try {
    const report = await reportService.generateReport(req.body);
    res.status(200).json(report);
  } catch (error) {
    logger.error(`Error generating report: ${error.message}`);
    res.status(500).json({ message: 'Error generating report', error });
  }
};

// Fetch a report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.reportId);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    logger.error(`Error fetching report ID ${req.params.reportId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching report', error });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  try {
    await reportService.deleteReport(req.params.reportId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting report ID ${req.params.reportId}: ${error.message}`);
    res.status(500).json({ message: 'Error deleting report', error });
  }
};

