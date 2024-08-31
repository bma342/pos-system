const { POSAlert } = require '../models/POSAlert';

const createPOSAlert = async (alertData) => {
  return await POSAlert.create(alertData);
};

const getPOSAlerts = async ()[]> => {
  return await POSAlert.findAll({
    order: [['timestamp', 'DESC']],
    limit: 50 // Limit to the most recent 50 alerts
  });
};