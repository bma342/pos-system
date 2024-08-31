const { Request, Response, NextFunction } = require 'express';
const AuditLog = require '../models/AuditLog';
const { AuthRequest } = require './auth';

const auditLogger = (action) => {
  return async (req, res, next) => {
    try {
      await AuditLog.create({
        userId.user?.id,
        action,
        details.stringify(req.body),
        ipAddress.ip,
        userAgent.get('User-Agent') || '',
      });
      next();
    } catch (error) {
      console.error('Error logging audit:', error);
      next();
    }
  };
};