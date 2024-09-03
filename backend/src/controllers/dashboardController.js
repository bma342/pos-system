const { Client, Order, MenuItem, User } = require('../models');
const { redisClient } = require('../config/redis');

exports.getDashboardData = async (req, res) => {
  const { clientId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const data = await DashboardData.findAndCountAll({
      where: { clientId },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      data: data.rows,
      totalPages: Math.ceil(data.count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

exports.getGlobalDashboardData = async (req, res) => {
  try {
    const cacheKey = 'dashboard:global';
    
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalRevenue, totalOrders, activeUsers, newCustomers, topSellingItems, totalClients] = await Promise.all([
      Order.sum('total', { where: { createdAt: { [Op.gte]: today } } }),
      Order.count({ where: { createdAt: { [Op.gte]: today } } }),
      User.count({ where: { lastLoginDate: { [Op.gte]: today } } }),
      User.count({ where: { createdAt: { [Op.gte]: today } } }),
      MenuItem.findAll({
        attributes: ['name', [sequelize.fn('COUNT', sequelize.col('orderItems.id')), 'orderCount']],
        include: [{
          model: OrderItem,
          attributes: [],
          where: { createdAt: { [Op.gte]: today } }
        }],
        group: ['MenuItem.id'],
        order: [[sequelize.literal('orderCount'), 'DESC']],
        limit: 5
      }),
      Client.count()
    ]);

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const dashboardData = {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      activeUsers,
      newCustomers,
      topSellingItems: topSellingItems.map(item => item.name),
      totalClients
    };

    await redisClient.setex(cacheKey, 300, JSON.stringify(dashboardData)); // Cache for 5 minutes

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching global dashboard data:', error);
    res.status(500).json({ message: 'Error fetching global dashboard data' });
  }
};