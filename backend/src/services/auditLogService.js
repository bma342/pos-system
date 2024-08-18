const { AuditLog } = require('../models');
const logger = require('../logger');

// Function to create an audit log entry
exports.createAuditLog = async (action, details, userId) => {
  try {
    // Log using Winston
    logger.info(`Action: ${action}, Details: ${JSON.stringify(details)}, User ID: ${userId}`);
    
    // Create the audit log entry
    await AuditLog.create({ action, details, userId });
  } catch (error) {
    logger.error(`Error creating audit log: ${error.message}`);
  }
};
