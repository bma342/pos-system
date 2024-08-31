const { Order, User, MenuItem } = require('../models');
const { Op } = require('sequelize');

const getRevenueData = async (startDate, endDate) => {
  const revenue = await Order.sum('total', {
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate]
      }
    }
  });

  return { revenue };
};

const getCustomerMetrics = async () => {
  const totalCustomers = await User.count();
  const newCustomers = await User.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
      }
    }
  });

  return { totalCustomers, newCustomers };
};

const getRealtimeMetrics = async () => {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate.setHours(0,0,0,0));

  const ordersToday = await Order.count({
    where: {
      createdAt: {
        [Op.gte]: startOfDay
      }
    }
  });

  const revenueToday = await Order.sum('total', {
    where: {
      createdAt: {
        [Op.gte]: startOfDay
      }
    }
  });

  const topSellingItems = await MenuItem.findAll({
    attributes: [
      'id',
      'name',
      [sequelize.fn('SUM', sequelize.col('OrderItems.quantity')), 'totalSold']
    ],
    include: [{
      model: OrderItem,
      attributes: [],
      where: {
        createdAt: {
          [Op.gte]: startOfDay
        }
      }
    }],
    group: ['MenuItem.id'],
    order: [[sequelize.literal('totalSold'), 'DESC']],
    limit: 5
  });

  return {
    ordersToday,
    revenueToday,
    topSellingItems
  };
};

module.exports = {
  getRevenueData,
  getCustomerMetrics,
  getRealtimeMetrics
};