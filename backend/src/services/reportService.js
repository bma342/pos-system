const db = require('../models');
const logger = require('../services/logger');

class ReportService {
  async generateReport({ reportType, locationId, clientId }) {
    try {
      let generatedData;
      switch (reportType) {
        case 'sales':
          generatedData = await this.generateSalesReport(locationId);
          break;
        case 'inventory':
          generatedData = await this.generateInventoryReport(locationId);
          break;
        case 'loyalty':
          generatedData = await this.generateLoyaltyReport(locationId);
          break;
        default:
          throw new Error('Invalid report type');
      }

      return await db.Report.create({
        name: `${reportType} Report`,
        reportType,
        clientId,
        locationId,
        generatedData,
      });
    } catch (error) {
      logger.error(`Error generating report: ${error.message}`);
      throw new Error('Error generating report');
    }
  }

  async generateSalesReport(locationId) {
    // Example sales data retrieval logic
    return {
      totalSales: 5000,
      topItems: ['Burger', 'Fries'],
    };
  }

  async generateInventoryReport(locationId) {
    // Example inventory data retrieval logic
    return {
      lowStockItems: ['Tomatoes', 'Lettuce'],
    };
  }

  async generateLoyaltyReport(locationId) {
    // Example loyalty data retrieval logic
    return {
      topLoyalCustomers: ['John Doe', 'Jane Smith'],
    };
  }

  async getReportById(reportId) {
    try {
      return await db.Report.findByPk(reportId);
    } catch (error) {
      logger.error(`Error fetching report ID ${reportId}: ${error.message}`);
      throw new Error('Error fetching report');
    }
  }

  async deleteReport(reportId) {
    try {
      await db.Report.destroy({ where: { id: reportId } });
      logger.info(`Report ID ${reportId} deleted successfully`);
    } catch (error) {
      logger.error(`Error deleting report ID ${reportId}: ${error.message}`);
      throw new Error('Error deleting report');
    }
  }
}

module.exports = new ReportService();
