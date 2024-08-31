const { ABTest, ABTestVariant, ABTestMetric } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const createABTest = async (testData) => {
  try {
    const abTest = await ABTest.create(testData, {
      include: [{ model: ABTestVariant, as: 'variants' }]
    });
    logger.info(`A/B Test created with ID: ${abTest.id}`);
    return abTest;
  } catch (error) {
    logger.error('Error creating A/B Test:', error);
    throw new AppError('Failed to create A/B Test', 500);
  }
};

const getABTest = async (id) => {
  try {
    const abTest = await ABTest.findByPk(id, {
      include: [{ model: ABTestVariant, as: 'variants' }]
    });
    if (!abTest) {
      throw new AppError('A/B Test not found', 404);
    }
    return abTest;
  } catch (error) {
    logger.error(`Error fetching A/B Test with ID ${id}:`, error);
    throw error;
  }
};

const updateABTest = async (id, updateData) => {
  try {
    const abTest = await getABTest(id);
    const updatedTest = await abTest.update(updateData);
    logger.info(`A/B Test updated with ID: ${id}`);
    return updatedTest;
  } catch (error) {
    logger.error(`Error updating A/B Test with ID ${id}:`, error);
    throw error;
  }
};

const deleteABTest = async (id) => {
  try {
    const abTest = await getABTest(id);
    await abTest.destroy();
    logger.info(`A/B Test deleted with ID: ${id}`);
  } catch (error) {
    logger.error(`Error deleting A/B Test with ID ${id}:`, error);
    throw error;
  }
};

const getABTestResults = async (id) => {
  try {
    const metrics = await ABTestMetric.findAll({
      where: { abTestId: id },
      include: [{ model: ABTestVariant, as: 'variant' }]
    });
    return metrics;
  } catch (error) {
    logger.error(`Error fetching A/B Test results for ID ${id}:`, error);
    throw new AppError('Failed to fetch A/B Test results', 500);
  }
};

const startABTest = async (id) => {
  try {
    const abTest = await getABTest(id);
    await abTest.update({ status: 'RUNNING', startDate: new Date() });
    logger.info(`A/B Test started with ID: ${id}`);
    return abTest;
  } catch (error) {
    logger.error(`Error starting A/B Test with ID ${id}:`, error);
    throw error;
  }
};

const stopABTest = async (id) => {
  try {
    const abTest = await getABTest(id);
    await abTest.update({ status: 'COMPLETED', endDate: new Date() });
    logger.info(`A/B Test stopped with ID: ${id}`);
    return abTest;
  } catch (error) {
    logger.error(`Error stopping A/B Test with ID ${id}:`, error);
    throw error;
  }
};

const recordMetric = async (abTestId, variantId, metricName, metricValue) => {
  try {
    const metric = await ABTestMetric.create({
      abTestId,
      variantId,
      metricName,
      metricValue
    });
    logger.info(`Metric recorded for A/B Test ID: ${abTestId}, Variant ID: ${variantId}`);
    return metric;
  } catch (error) {
    logger.error(`Error recording metric for A/B Test ID: ${abTestId}:`, error);
    throw new AppError('Failed to record metric', 500);
  }
};

module.exports = {
  createABTest,
  getABTest,
  updateABTest,
  deleteABTest,
  getABTestResults,
  startABTest,
  stopABTest,
  recordMetric
};