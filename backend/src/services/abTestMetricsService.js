const { ABTestMetric } = require '../models/ABTestMetric';
const { AppError } = require '../utils/errorHandler';

const trackABTestMetric = async (testId, variant: 'A' | 'B', metricType, value) => {
  const metric = await ABTestMetric.create({
    testId,
    variant,
    metricType,
    value,
  });
  return metric;
};

const getABTestMetrics = async (testId) => {
  const metrics = await ABTestMetric.findAll({
    where: { testId },
    group: ['variant', 'metricType'],
    attributes: [
      'variant',
      'metricType',
      [sequelize.fn('AVG', sequelize.col('value')), 'averageValue'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
    ],
  });
  return metrics;
};