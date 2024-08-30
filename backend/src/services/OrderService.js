const Order = require('../models/Order');
const moment = require('moment-timezone');
const Location = require('../models/Location');
const PosIntegrationService = require('./PosIntegrationService');
const GlobalSettingService = require('./GlobalSettingService');
const logger = require('../services/logger');

class OrderService {
  static async createOrder(orderData) {
    const { scheduleType, scheduledTime, locationId } = orderData;
    const location = await Location.findByPk(locationId);

    if (!location) {
      throw new Error('Location not found');
    }

    const timeZone = location.timeZone;
    let finalScheduledTime = scheduledTime;

    if (scheduleType === 'scheduled') {
      const prepTime = location.prepTime;
      const roundedScheduledTime = this.roundToNextPrettyTimeSlot(scheduledTime, prepTime, timeZone);

      if (moment.tz(new Date(), timeZone).isAfter(moment.tz(roundedScheduledTime, timeZone).subtract(prepTime, 'minutes'))) {
        finalScheduledTime = this.roundToNextPrettyTimeSlot(new Date(), prepTime, timeZone);
      } else {
        finalScheduledTime = roundedScheduledTime;
      }
    } else {
      finalScheduledTime = moment.tz(timeZone).add(location.prepTime, 'minutes').toDate();
    }

    try {
      if (scheduleType === 'scheduled') {
        const globalSetting = await GlobalSettingService.getSettingForScheduledOrders();
        if (globalSetting === 'fire_immediately') {
          await PosIntegrationService.sendOrderToPOS(orderData);
        } else {
          const delay = moment.tz(finalScheduledTime, timeZone).diff(moment.tz(timeZone), 'milliseconds') - location.prepTime * 60 * 1000;
          setTimeout(() => {
            PosIntegrationService.sendOrderToPOS(orderData)
              .catch(error => logger.error(`Failed to send scheduled order to POS: ${error.message}`));
          }, delay);
        }
      } else {
        await PosIntegrationService.sendOrderToPOS(orderData);
      }

      const createdOrder = await Order.create({
        ...orderData,
        scheduledTime: finalScheduledTime,
      });

      logger.info(`Order created successfully. Order ID: ${createdOrder.id}`);
      return createdOrder;
    } catch (error) {
      logger.error(`Failed to create order: ${error.message}`);
      throw error;
    }
  }

  static roundToNextPrettyTimeSlot(date, prepTime, timeZone) {
    const roundedMinutes = Math.ceil(moment.tz(date, timeZone).minute() / 15) * 15;
    const roundedDate = moment.tz(date, timeZone).startOf('hour').add(roundedMinutes, 'minutes');
    return roundedDate.add(prepTime, 'minutes').toDate();
  }
}

module.exports = OrderService;
