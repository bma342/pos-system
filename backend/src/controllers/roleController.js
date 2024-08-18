const Role = require('../models/Role');
const Permission = require('../models/Permission');

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
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
    res.json({ message: 'Permission assigned to role successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning permission', error });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
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
