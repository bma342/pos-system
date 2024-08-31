const { Order, OrderItem, Product } = require '../models';
const { Op } = require 'sequelize';

const getSalesByCategory = async (startDate, endDate) => {
  const sales = await OrderItem.findAll({
    include: [
      {
        model,
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      },
      {
        model,
        include: ['Category'],
      },
    ],
    attributes: [
      'Product.Category.name',
      [sequelize.fn('SUM', sequelize.col('OrderItem.quantity')), 'totalQuantity'],
      [sequelize.fn('SUM', sequelize.col('OrderItem.price')), 'totalSales'],
    ],
    group: ['Product.Category.name'],
  });

  return sales;
};

const getTopSellingItems = async (startDate, endDate, limit = 10) => {
  const topItems = await OrderItem.findAll({
    include: [
      {
        model,
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      },
      {
        model,
      },
    ],
    attributes: [
      'Product.name',
      [sequelize.fn('SUM', sequelize.col('OrderItem.quantity')), 'totalQuantity'],
      [sequelize.fn('SUM', sequelize.col('OrderItem.price')), 'totalSales'],
    ],
    group: ['Product.id'],
    order: [[sequelize.fn('SUM', sequelize.col('OrderItem.quantity')), 'DESC']],
    limit,
  });

  return topItems;
};