const { createAuditLog } = require('../services/auditLogService');

exports.createAuditLog = async (req, res) => {
  const { action, details, userId } = req.body;

  try {
    await createAuditLog(action, details, userId);
    res.status(201).json({ message: 'Audit log created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
