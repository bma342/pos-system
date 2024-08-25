const db = require('../models');

// Fetch analytics data for a specific client
exports.getClientAnalytics = async (req, res) => {
  try {
    const analytics = await db.Analytics.findAll({
      where: { clientId: req.user.clientId },
      order: [['timestamp', 'DESC']],
    });
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics data', error });
  }
};

// Add a new analytics entry (for A/B test results, custom metrics, etc.)
exports.addAnalyticsEntry = async (req, res) => {
  try {
    const analyticsEntry = await db.Analytics.create({
      ...req.body,
      clientId: req.user.clientId,
    });
    res.status(201).json(analyticsEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error adding analytics entry', error });
  }
};
