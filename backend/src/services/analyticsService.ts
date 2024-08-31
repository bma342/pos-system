import { Order, Customer, Product } from '../models';
import { Op, Sequelize } from 'sequelize';
import { redisClient } from '../config/redis';

export const getRevenueData = async (startDate: Date, endDate: Date) => {
  const cacheKey = `revenue:${startDate.toISOString()}:${endDate.toISOString()}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const revenue = await Order.findAll({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate]
      }
    },
    attributes: [
      [Sequelize.fn('date', Sequelize.col('createdAt')), 'date'],
      [Sequelize.fn('sum', Sequelize.col('total')), 'amount']
    ],
    group: [Sequelize.fn('date', Sequelize.col('createdAt'))],
    order: [[Sequelize.fn('date', Sequelize.col('createdAt')), 'ASC']]
  });

  await redisClient.set(cacheKey, JSON.stringify(revenue), 'EX', 3600); // Cache for 1 hour

  return revenue;
};

export const getCustomerMetrics = async () => {
  const cacheKey = 'customer_metrics';
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const [totalCustomers, newCustomers, repeatCustomers, averageOrderValue] = await Promise.all([
    Customer.count(),
    Customer.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    }),
    Order.count({
      distinct: true,
      col: 'customerId',
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      },
      having: Sequelize.literal('COUNT(DISTINCT(createdAt)) > 1')
    }),
    Order.findOne({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('total')), 'averageOrderValue']],
      raw: true
    })
  ]);

  const metrics = {
    totalCustomers,
    newCustomers,
    repeatCustomers,
    averageOrderValue: averageOrderValue?.averageOrderValue || 0
  };

  await redisClient.set(cacheKey, JSON.stringify(metrics), 'EX', 300); // Cache for 5 minutes

  return metrics;
};

export const getRealtimeMetricsData = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todaySales, todayOrders, newGuests, returningGuests, mostPopularItem] = await Promise.all([
    Order.sum('total', { where: { createdAt: { [Op.gte]: today } } }),
    Order.count({ where: { createdAt: { [Op.gte]: today } } }),
    Customer.count({ where: { createdAt: { [Op.gte]: today } } }),
    Order.count({
      distinct: true,
      col: 'customerId',
      where: {
        createdAt: { [Op.gte]: today },
        '$customer.createdAt$': { [Op.lt]: today }
      },
      include: [{ model: Customer, attributes: [] }]
    }),
    Product.findOne({
      attributes: ['name'],
      include: [{
        model: Order,
        attributes: [],
        where: { createdAt: { [Op.gte]: today } }
      }],
      order: [[Sequelize.fn('COUNT', Sequelize.col('orders.id')), 'DESC']],
      group: ['Product.id'],
      limit: 1
    })
  ]);

  const averageOrderValue = todayOrders > 0 ? todaySales / todayOrders : 0;

  return {
    todaySales,
    todayOrders,
    averageOrderValue,
    newGuests,
    returningGuests,
    mostPopularItem: mostPopularItem?.name || ''
  };
};

import { Order, MenuItem, User } from '../models';
import { Op } from 'sequelize';

export const generateSalesReport = async (startDate: Date, endDate: Date) => {
  const orders = await Order.findAll({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate]
      }
    },
    include: [{ model: MenuItem }]
  });

  // Process orders and generate report
  // ...

  return {
    totalSales: orders.reduce((sum, order) => sum + order.total, 0),
    orderCount: orders.length,
    // Add more metrics as needed
  };
};

export const generateForecast = async () => {
  // Implement forecasting logic based on historical data
  // ...
};