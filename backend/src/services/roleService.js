const Role = require('../models/Role');
const Permission = require('../models/Permission');

exports.createRole = async (roleData) => {
  try {
    const role = await Role.create(roleData);
    return role;
  } catch (error) {
    throw new Error('Error creating role: ' + error.message);
  }
};

exports.assignPermissionsToRole = async (roleId, permissionIds) => {
  try {
    const role = await Role.findByPk(roleId);
    if (!role) throw new Error('Role not found');

    const permissions = await Permission.findAll({ where: { id: permissionIds } });
    await role.setPermissions(permissions);
    return role;
  } catch (error) {
    throw new Error('Error assigning permissions: ' + error.message);
  }
};
