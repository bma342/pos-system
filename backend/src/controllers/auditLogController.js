const { createAuditLog, fetchAuditLogs } = require('../services/auditLogService');

// Create an audit log entry
exports.createAuditLog = async (req, res) => {
  const { action, details, userId } = req.body;

  try {
    await createAuditLog(action, details, userId);
    res.status(201).json({ message: 'Audit log created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all audit logs with filtering options (e.g., by user, action type, date range)
exports.getAuditLogs = async (req, res) => {
  const { userId, action, dateRangeStart, dateRangeEnd } = req.query;

  try {
    const logs = await fetchAuditLogs({ userId, action, dateRangeStart, dateRangeEnd });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit logs', details: error.message });
  }
};

// Fetch audit logs by specific user
exports.getAuditLogsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const logs = await fetchAuditLogs({ userId });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user audit logs', details: error.message });
  }
};

// Fetch audit logs by action type
exports.getAuditLogsByAction = async (req, res) => {
  const { action } = req.params;

  try {
    const logs = await fetchAuditLogs({ action });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit logs by action', details: error.message });
  }
};

// Fetch audit logs within a specific date range
exports.getAuditLogsByDateRange = async (req, res) => {
  const { dateRangeStart, dateRangeEnd } = req.query;

  try {
    const logs = await fetchAuditLogs({ dateRangeStart, dateRangeEnd });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit logs by date range', details: error.message });
  }
};
