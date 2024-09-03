const Location = require('../models/Location');

class OrderThrottleService {
  static async adjustReadyTime(locationId) {
    const location = await Location.findByPk(locationId);
    const { throttleSettings } = location;

    // Logic to determine the new ready time based on sales volume, item count, etc.
    if (throttleSettings && throttleSettings.orderThreshold) { // Assuming some condition to adjust time
      location.readyTime += 10; // Example adjustment
    }

    await location.save();
  }
}

module.exports = OrderThrottleService;
