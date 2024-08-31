const { Request, Response } = require 'express';
const { AuditLog } = require '../models';

const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, startDate, endDate, userId, action } = req.query;
    const options = {
      order: [['createdAt', 'DESC']],
      limit(limit ),
      offset: (parseInt(page ) - 1) * parseInt(limit ),
    };

    if (startDate && endDate) {
      options.where = {
        ...options.where,
        createdAt: {
          [Op.between]: [new Date(startDate ), new Date(endDate )],
        },
      };
    }

    if (userId) {
      options.where = {
        ...options.where,
        userId,
      };
    }

    if (action) {
      options.where = {
        ...options.where,
        action,
      };
    }

    const logs = await AuditLog.findAndCountAll(options);

    res.json({
      logs.rows,
      totalPages.ceil(logs.count / parseInt(limit )),
      currentPage(page ),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audit logs', error });
  }
};