const Order = require('../models/Order');
const moment = require('moment-timezone');
const Location = require('../models/Location');
const PosIntegrationService = require('./PosIntegrationService');

class OrderService {
  static async createOrder(orderData) {
    const { scheduleType, scheduledTime, locationId } = orderData;
    const location = await Location.findByPk(locationId);

    const timeZone = location.timeZone; // Get the location's assigned time zone
    let finalScheduledTime = scheduledTime;

    if (scheduleType === 'scheduled') {
      const prepTime = location.prepTime; // Location-specific prep time in minutes
      const roundedScheduledTime = roundToNextPrettyTimeSlot(scheduledTime, prepTime, timeZone);

      // Adjust the scheduled time dynamically if the user takes too long to check out
      if (moment.tz(new Date(), timeZone).isAfter(moment.tz(roundedScheduledTime, timeZone).subtract(prepTime, 'minutes'))) {
        finalScheduledTime = roundToNextPrettyTimeSlot(new Date(), prepTime, timeZone);
      }
    } else {
      // If it's ASAP, dynamically calculate the estimated ready time based on prep time
      finalScheduledTime = moment.tz(timeZone).add(location.prepTime, 'minutes').toDate();
    }

    // Logic to handle whether the order is fired immediately to the POS or held based on global settings
    if (scheduleType === 'scheduled') {
      const globalSetting = await getGlobalSettingForScheduledOrders(); // Assume this function exists
      if (globalSetting === 'fire_immediately') {
        // Send to POS immediately
        await PosIntegrationService.sendOrderToPOS(orderData);
      } else {
        // Hold the order and fire it at the appropriate time
        setTimeout(() => {
          PosIntegrationService.sendOrderToPOS(orderData);
        }, moment.tz(finalScheduledTime, timeZone).diff(moment.tz(timeZone), 'milliseconds') - location.prepTime * 60 * 1000);
      }
    } else {
      // For ASAP orders, send directly to POS
      await PosIntegrationService.sendOrderToPOS(orderData);
    }

    return await Order.create({
      ...orderData,
      scheduledTime: finalScheduledTime,
    });
  }
}

// Helper function to round the time to the next "pretty" time slot while respecting the time zone
function roundToNextPrettyTimeSlot(date, prepTime, timeZone) {
  const roundedMinutes = Math.ceil(moment.tz(date, timeZone).minute() / 15) * 15;
  const roundedDate = moment.tz(date, timeZone).startOf('hour').add(roundedMinutes, 'minutes');
  return roundedDate.add(prepTime, 'minutes').toDate();
}

module.exports = OrderService;
