const db = require('../models');

const createABTest = async ({ testName, menuItemId, testVariant, variantDescription, testType, clientId, startDate }) => {
  return await db.ABTest.create({
    testName,
    menuItemId,
    testVariant,
    variantDescription,
    testType,
    startDate,
    clientId,
  });
};

const trackABTestResult = async ({ testId, metricName, metricValue, testGroup }) => {
  return await db.Analytics.create({
    clientId: testId.clientId,
    metricType: 'menuImageABTest',
    testGroup,
    metricName,
    metricValue,
  });
};

module.exports = {
  createABTest,
  trackABTestResult,
};
