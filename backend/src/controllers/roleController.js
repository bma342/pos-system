const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RoleTemplate = require('../models/RoleTemplate');
const { createAuditLog } = require('../services/auditLogService');

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    await createAuditLog('Role Created', { role: role.name }, req.user.id);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

exports.assignPermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ message: 'Role or Permission not found' });
    }

    await role.addPermission(permission);
    await createAuditLog('Permission Assigned', { role: role.name, permission: permission.name }, req.user.id);
    res.json({ message: 'Permission assigned to role successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning permission', error });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: Permission }, { model: RoleTemplate }],
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
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

// Update role template assignments
exports.assignRoleTemplate = async (req, res) => {
  try {
    const { roleId, roleTemplateId } = req.body;
    const role = await Role.findByPk(roleId);
    const roleTemplate = await RoleTemplate.findByPk(roleTemplateId);

    if (!role || !roleTemplate) {
      return res.status(404).json({ message: 'Role or Role Template not found' });
    }

    await role.addRoleTemplate(roleTemplate);
    await createAuditLog('Role Template Assigned', { role: role.name, roleTemplate: roleTemplate.name }, req.user.id);
    res.json({ message: 'Role template assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning role template', error });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [{ model: Permission }, { model: RoleTemplate }],
    });
    if (!role) return res.status(404).json({ message: 'Role not found' });

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await role.update(req.body);
    await createAuditLog('Role Updated', { role: role.name }, req.user.id);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await role.destroy();
    await createAuditLog('Role Deleted', { role: role.name }, req.user.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
};
