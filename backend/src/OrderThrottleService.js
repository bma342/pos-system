const Location = require('../models/Location');

class OrderThrottleService {
  static async adjustReadyTime(locationId) {
    const location = await Location.findByPk(locationId);
    const { throttleSettings } = location;

    // Logic to determine the new ready time based on sales volume, item count, etc.
    if (location.salesVolume > throttleSettings.volumeThreshold) {
      location.readyTime += throttleSettings.increment; // Example adjustment
    }

    await location.save();
    return location.readyTime;
  }
}

module.exports = OrderThrottleService;
