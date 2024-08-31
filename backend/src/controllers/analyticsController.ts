import express from 'express';
import { getRevenueData, getCustomerMetrics, getRealtimeMetricsData } from '../services/analyticsService';
import { AppError } from '../utils/errorHandler';
import { cacheMiddleware } from '../middleware/cache';
import OrderModel from '../models/Order';
import GuestModel from '../models/Guest';

export const getOrderAnalytics = async (req: express.Request, res: express.Response) => {
  try {
    const startDate = new Date(req.query.start as string);
    const endDate = new Date(req.query.end as string);

    const orders = await OrderModel.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    // Process orders data as needed for Grafana
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

export const getGuestAnalytics = async (req: express.Request, res: express.Response) => {
  try {
    const guests = await GuestModel.find();

    // Process guest data as needed for Grafana
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

export const getRevenue = async (req: express.Request, res: express.Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      throw new AppError('Start date and end date are required', 400);
    }
    const revenue = await getRevenueData(new Date(startDate as string), new Date(endDate as string));
    res.json(revenue);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching revenue data' });
    }
  }
};

export const getCustomers = async (req: express.Request, res: express.Response) => {
  try {
    const metrics = await getCustomerMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer metrics' });
  }
};

export const getRealtimeMetricsHandler = [
  cacheMiddleware(60), // Cache for 1 minute
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const metrics = await getRealtimeMetricsData();
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }
];