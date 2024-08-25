const db = require('../models');

class LocationService {
  async createLocation(clientId, locationDetails) {
    const client = await db.Client.findByPk(clientId);
    if (!client) {
      throw new Error('Client not found');
    }

    const location = await db.Location.create({
      ...locationDetails,
      clientId: client.id,
    });

    await this.setupDefaultLocationSettings(location);

    return location;
  }

  async setupDefaultLocationSettings(location) {
    // Implement logic for default hours, menu assignments, etc.
  }

  async createDropOffSpot(locationId, spotDetails) {
    const location = await db.Location.findByPk(locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    const distanceFromLocation = this.calculateDistance(location.gpsCoordinates, spotDetails.gpsCoordinates);

    if (distanceFromLocation > location.maxDropOffDistance) {
      throw new Error('Drop-off spot is outside the allowed territory');
    }

    return await db.DropOffSpot.create({
      ...spotDetails,
      locationId,
      distanceFromLocation,
    });
  }

  async getDropOffSpots(locationId) {
    return await db.DropOffSpot.findAll({ where: { locationId } });
  }

  async updateDropOffSpot(spotId, spotDetails) {
    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      throw new Error('Drop-off spot not found');
    }

    return await dropOffSpot.update(spotDetails);
  }

  async deleteDropOffSpot(spotId) {
    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      throw new Error('Drop-off spot not found');
    }

    return await dropOffSpot.destroy();
  }

  async getLocations(clientId) {
    return await db.Location.findAll({ where: { clientId } });
  }

  async getLocationById(locationId) {
    return await db.Location.findByPk(locationId);
  }

  async updateLocation(locationId, locationDetails) {
    const location = await db.Location.findByPk(locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    return await location.update(locationDetails);
  }

  async deleteLocation(locationId) {
    const location = await db.Location.findByPk(locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    return await location.destroy();
  }

  calculateDistance(coords1, coords2) {
    if (!coords1 || !coords2) return 0;

    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.latitude)) *
        Math.cos(toRad(coords2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }
}

module.exports = new LocationService();
