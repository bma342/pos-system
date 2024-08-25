const analyticsService = require('../services/analyticsService');

// Generate A/B Test Report
exports.getABTestReport = async (req, res) => {
  try {
    const { testId } = req.params;
    const performance = await analyticsService.calculateABTestPerformance(testId);

    if (!performance) {
      return res.status(404).json({ message: 'A/B Test data not found.' });
    }

    res.status(200).json(performance);
  } catch (error) {
    console.error(`Error generating A/B Test report: ${error.message}`);
    res.status(500).json({ message: 'Error generating A/B Test report', error });
  }
};

// Generate Discount Performance Report
exports.getDiscountPerformance = async (req, res) => {
  try {
    const { discountId } = req.params;
    const performance = await analyticsService.calculateDiscountPerformance(discountId);

    if (!performance) {
      return res.status(404).json({ message: 'Discount performance data not found.' });
    }

    res.status(200).json(performance);
  } catch (error) {
    console.error(`Error generating discount report: ${error.message}`);
    res.status(500).json({ message: 'Error generating discount report', error });
  }
};

// Additional marketing-related methods can be added here as needed.
