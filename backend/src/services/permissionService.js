const Permission = require('../models/Permission');

exports.createPermission = async (permissionData) => {
  try {
    const permission = await Permission.create(permissionData);
    return permission;
  } catch (error) {
    throw new Error('Error creating permission: ' + error.message);
  }
};

exports.getAllPermissions = async () => {
  try {
    const permissions = await Permission.findAll();
    return permissions;
  } catch (error) {
    throw new Error('Error fetching permissions: ' + error.message);
  }
};

exports.updatePermission = async (permissionId, updatedData) => {
  try {
    const permission = await Permission.findByPk(permissionId);
    if (!permission) throw new Error('Permission not found');

    await permission.update(updatedData);
    return permission;
  } catch (error) {
    throw new Error('Error updating permission: ' + error.message);
  }
};
