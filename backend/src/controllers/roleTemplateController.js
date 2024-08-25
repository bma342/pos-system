const { RoleTemplate, Role } = require('../models');
const { createAuditLog } = require('../services/auditLogService');

// Fetch all role templates
exports.getAllRoleTemplates = async (req, res) => {
  try {
    const roleTemplates = await RoleTemplate.findAll({
      include: [Role], // Include associated roles
    });
    res.status(200).json(roleTemplates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role templates', error });
  }
};

// Fetch a single role template by ID
exports.getRoleTemplateById = async (req, res) => {
  try {
    const roleTemplate = await RoleTemplate.findByPk(req.params.id, {
      include: [Role],
    });
    if (!roleTemplate) return res.status(404).json({ message: 'Role template not found' });
    res.status(200).json(roleTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role template', error });
  }
};

// Create a new role template
exports.createRoleTemplate = async (req, res) => {
  try {
    const { name, description, roles } = req.body;

    const roleTemplate = await RoleTemplate.create({ name, description });

    if (roles && roles.length) {
      await roleTemplate.setRoles(roles); // Associate roles with the template
    }

    await createAuditLog('Role Template Created', { roleTemplate: name }, req.user.id);
    res.status(201).json(roleTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error creating role template', error });
  }
};

// Update a role template
exports.updateRoleTemplate = async (req, res) => {
  try {
    const roleTemplate = await RoleTemplate.findByPk(req.params.id);
    if (!roleTemplate) return res.status(404).json({ message: 'Role template not found' });

    const { name, description, roles } = req.body;

    await roleTemplate.update({ name, description });

    if (roles && roles.length) {
      await roleTemplate.setRoles(roles); // Update associated roles
    }

    await createAuditLog('Role Template Updated', { roleTemplate: name }, req.user.id);
    res.json(roleTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role template', error });
  }
};

// Delete a role template
exports.deleteRoleTemplate = async (req, res) => {
  try {
    const roleTemplate = await RoleTemplate.findByPk(req.params.id);
    if (!roleTemplate) return res.status(404).json({ message: 'Role template not found' });

    await roleTemplate.destroy();
    await createAuditLog('Role Template Deleted', { roleTemplate: roleTemplate.name }, req.user.id);
    res.json({ message: 'Role template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role template', error });
  }
};
