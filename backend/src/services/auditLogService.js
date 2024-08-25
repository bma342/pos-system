const { AuditLog } = require('../models');
const logger = require('../logger');

// Function to create an audit log entry
exports.createAuditLog = async (action, details, userId) => {
  try {
    // Log using Winston
    logger.info(`Action: ${action}, Details: ${JSON.stringify(details)}, User ID: ${userId}`);
    
    // Create the audit log entry in the database
    await AuditLog.create({ action, details, userId });
  } catch (error) {
    logger.error(`Error creating audit log: ${error.message}`);
  }
};

// Function to fetch audit logs with optional filters
exports.fetchAuditLogs = async (filters) => {
  try {
    const whereClause = {};

    // Apply filters for userId, action, and date range
    if (filters.userId) whereClause.userId = filters.userId;
    if (filters.action) whereClause.action = filters.action;
    if (filters.dateRangeStart && filters.dateRangeEnd) {
      whereClause.timestamp = {
        [Op.between]: [filters.dateRangeStart, filters.dateRangeEnd],
      };
    }

    // Fetch the audit logs based on filters
    return await AuditLog.findAll({ where: whereClause, order: [['timestamp', 'DESC']] });
  } catch (error) {
    logger.error(`Error fetching audit logs: ${error.message}`);
    throw new Error('Error fetching audit logs');
  }
};
