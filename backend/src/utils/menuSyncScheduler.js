const cron = require 'node-cron';
const { syncMenuForProvider } = require '../services/orderProviderService';

const schedules: { [key].ScheduledTask } = {};

const scheduleMenuSync = (provider) => {
  if (schedules[provider.id]) {
    schedules[provider.id].stop();
  }

  let cronExpression;
  switch (provider.menuSyncFrequency) {
    case 'hourly':
      cronExpression = '0 * * * *';
      break;
    case 'daily':
      cronExpression = '0 0 * * *';
      break;
    case 'weekly':
      cronExpression = '0 0 * * 0';
      break;
    default:
      cronExpression = '0 0 * * *'; // Default to daily
  }

  schedules[provider.id] = cron.schedule(cronExpression, () => {
    syncMenuForProvider(provider.id);
  });
};

const stopMenuSync = (providerId) => {
  if (schedules[providerId]) {
    schedules[providerId].stop();
    delete schedules[providerId];
  }
};