const { Request, Response } = require('express');
const { getRevenueData, getCustomerMetrics, getRealtimeMetrics } = require('../services/analyticsService');
const { AppError } = require('../utils/errorHandler');
const cacheMiddleware = require('../middleware/cache'); // Changed this line
const { Order, Guest } = require('../models');

const getOrderAnalytics = async (req, res) => {
  try {
    const startDate = new Date(req.query.start);
    const endDate = new Date(req.query.end);

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    // Process orders data for Grafana
    const processedData = orders.map(order => ({
      timestamp: order.createdAt,
      total: order.total,
      // Add other relevant fields
    }));

    res.json(processedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order analytics' });
  }
};

const getGuestAnalytics = async (req, res) => {
  try {
    const guests = await Guest.find();

    // Process guest data for Grafana
    const processedData = guests.map(guest => ({
      id: guest.id,
      loyaltyPoints: guest.loyaltyPoints,
      totalOrders: guest.orders.length,
      // Add other relevant fields
    }));

    res.json(processedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest analytics' });
  }
};

const getRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      throw new AppError('Start date and end date are required', 400);
    }
    const revenue = await getRevenueData(new Date(startDate), new Date(endDate));
    res.json(revenue);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching revenue data' });
    }
  }
};

const getCustomers = async (req, res) => {
  try {
    const metrics = await getCustomerMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer metrics' });
  }
};

const getRealtimeMetricsController = [
  cacheMiddleware(60), // Cache for 1 minute
  async (req, res) => {
    try {
      const metrics = await getRealtimeMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching realtime metrics' });
    }
  }
];

module.exports = {
  getOrderAnalytics,
  getGuestAnalytics,
  getRevenue,
  getCustomers,
  getRealtimeMetricsController
};
