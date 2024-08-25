const Permission = require('../models/Permission');
const { createAuditLog } = require('../services/auditLogService');

exports.createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    await createAuditLog('Permission Created', { permission: permission.name }, req.user.id);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating permission', error });
  }
};

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching permissions', error });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return res.status(404).json({ message: 'Permission not found' });

    await permission.update(req.body);
    await createAuditLog('Permission Updated', { permission: permission.name }, req.user.id);
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Error updating permission', error });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return res.status(404).json({ message: 'Permission not found' });

    await permission.destroy();
    await createAuditLog('Permission Deleted', { permission: permission.name }, req.user.id);
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting permission', error });
  }
};
