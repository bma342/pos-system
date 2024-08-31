const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RoleTemplate = require('../models/RoleTemplate');
const { createAuditLog } = require('../services/auditLogService');
const roleService = require('../services/roleService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    logger.error('Error creating role:', error);
    next(new AppError('Failed to create role', 500));
  }
};

exports.assignPermission = async (req, res, next) => {
  try {
    await roleService.assignPermission(req.body.roleId, req.body.permissionId);
    res.status(200).json({ message: 'Permission assigned successfully' });
  } catch (error) {
    logger.error('Error assigning permission:', error);
    next(error);
  }
};

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    logger.error('Error fetching all roles:', error);
    next(new AppError('Failed to fetch roles', 500));
  }
};

exports.getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await roleService.getAllPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    logger.error('Error fetching all permissions:', error);
    next(new AppError('Failed to fetch permissions', 500));
  }
};

// Update role template assignments
exports.assignRoleTemplate = async (req, res, next) => {
  try {
    await roleService.assignRoleTemplate(req.body.roleId, req.body.roleTemplateId);
    res.status(200).json({ message: 'Role template assigned successfully' });
  } catch (error) {
    logger.error('Error assigning role template:', error);
    next(error);
  }
};

exports.getRoleById = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return next(new AppError('Role not found', 404));
    }
    res.status(200).json(role);
  } catch (error) {
    logger.error(`Error fetching role ${req.params.id}:`, error);
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.status(200).json(updatedRole);
  } catch (error) {
    logger.error(`Error updating role ${req.params.id}:`, error);
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting role ${req.params.id}:`, error);
    next(error);
  }
};

exports.assignRole = async (req, res, next) => {
  try {
    await roleService.assignRole(req.body.userId, req.body.roleId);
    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    logger.error('Error assigning role:', error);
    next(error);
  }
};

exports.removeRole = async (req, res, next) => {
  try {
    await roleService.removeRole(req.body.userId, req.body.roleId);
    res.status(200).json({ message: 'Role removed successfully' });
  } catch (error) {
    logger.error('Error removing role:', error);
    next(error);
  }
};

exports.getUserRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getUserRoles(req.params.userId);
    res.status(200).json(roles);
  } catch (error) {
    logger.error(`Error fetching roles for user ${req.params.userId}:`, error);
    next(error);
  }
};
