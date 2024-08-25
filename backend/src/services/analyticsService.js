const db = require('../models');
const logger = require('../services/logger');
const csvWriter = require('csv-writer').createObjectCsvWriter;

class AnalyticsService {
  // Capture A/B test data
  async captureABTestData(testData) {
    try {
      const { testId, metricName, metricValue, testGroup, clientId } = testData;
      await db.Analytics.create({
        clientId,
        testId,
        metricType: 'menuImageABTest',
        testGroup,
        metricName,
        metricValue,
      });
      logger.info(`A/B test data captured: Test ID ${testId} for Client ID ${clientId}`);
    } catch (error) {
      logger.error(`Error capturing A/B test data: ${error.message}`);
      throw error;
    }
  }

  // Generate report and export as CSV
  async generateReport(reportType, clientId) {
    try {
      let data;
      if (reportType === 'orders') {
        data = await db.Order.findAll({ where: { clientId } });
      } else if (reportType === 'payments') {
        data = await db.Payment.findAll({ where: { clientId } });
      } else if (reportType === 'abTests') {
        data = await db.Analytics.findAll({ where: { clientId, metricType: 'menuImageABTest' } });
      }

      const filePath = `/tmp/${reportType}_report_${Date.now()}.csv`;
      const writer = csvWriter({
        path: filePath,
        header: Object.keys(data[0].dataValues).map((key) => ({ id: key, title: key })),
      });

      await writer.writeRecords(data.map((entry) => entry.dataValues));

      logger.info(`Report generated: ${filePath} for Client ID ${clientId}`);
      return filePath;
    } catch (error) {
      logger.error(`Error generating report for Client ID ${clientId}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AnalyticsService();
