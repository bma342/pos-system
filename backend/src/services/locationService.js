const db = require('../models');

class LocationService {
  // Create a new location
  async createLocation(clientId, locationDetails) {
    const client = await db.Client.findByPk(clientId);
    if (!client) {
      throw new Error('Client not found');
    }

    const location = await db.Location.create({
      ...locationDetails,
      clientId,
    });

    // Utilize the created location object for additional operations
    await this.setupDefaultLocationSettings(location);

    return location;
  }

  // Setup default settings for a new location
  async setupDefaultLocationSettings(location) {
    // Example logic for setting default hours or menu assignments
    console.log(`Setting up default settings for location: ${location.id}`);
  }

  // Update location details
  async updateLocation(locationId, locationDetails) {
    const location = await db.Location.findByPk(locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    const updatedLocation = await location.update(locationDetails);

    // Log the update for debugging purposes
    console.log(`Updated location: ${updatedLocation.id}`);

    return updatedLocation;
  }

  // Fetch all locations for a client
  async getLocations(clientId) {
    return await db.Location.findAll({ where: { clientId } });
  }

  // Fetch a single location by ID
  async getLocationById(locationId) {
    return await db.Location.findByPk(locationId);
  }

  // Delete a location
  async deleteLocation(locationId) {
    const location = await db.Location.findByPk(locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    return await location.destroy();
  }

  // Create a drop-off spot for a location
  async createDropOffSpot(locationId, spotDetails) {
    const location = await db.Location.findByPk(locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    return await db.DropOffSpot.create({
      ...spotDetails,
      locationId,
    });
  }

  // Fetch all drop-off spots for a location
  async getDropOffSpots(locationId) {
    return await db.DropOffSpot.findAll({ where: { locationId } });
  }

  // Update drop-off spot details
  async updateDropOffSpot(spotId, spotDetails) {
    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      throw new Error('Drop-off spot not found');
    }

    return await dropOffSpot.update(spotDetails);
  }

  // Delete a drop-off spot
  async deleteDropOffSpot(spotId) {
    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      throw new Error('Drop-off spot not found');
    }

    return await dropOffSpot.destroy();
  }
}

module.exports = new LocationService();
