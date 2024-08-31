const { Order, MenuItem } = require('../models');
const { Op } = require('sequelize');
const { io } = require('../socket');

const getDashboardData = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const orders = await Order.findAll({
    where: {
      createdAt: {
        [Op.gte]: today
      }
    },
    include: [{ model: MenuItem }]
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const itemSales = orders.flatMap(order => 
    order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      revenue: item.price * item.quantity
    }))
  );

  const topSellingItems = Object.values(itemSales.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { name: item.name, quantity: 0, revenue: 0 };
    }
    acc[item.name].quantity += item.quantity;
    acc[item.name].revenue += item.revenue;
    return acc;
  }, {})).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  const recentOrders = orders
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)
    .map(order => ({
      id: order.id,
      total: order.total,
      status: order.status
    }));

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    topSellingItems,
    recentOrders
  };
};

const emitDashboardUpdate = async () => {
  const dashboardData = await getDashboardData();
  io.emit('dashboard-update', dashboardData);
};

const emitNewOrder = (order) => {
  io.emit('new-order', {
    id: order.id,
    total: order.total,
    status: order.status
  });
};

module.exports = {
  getDashboardData,
  emitDashboardUpdate,
  emitNewOrder
};