const Location = require('../models/Location');
const geoTz = require('geo-tz'); // For determining timezone based on lat/lon
const axios = require('axios');

class LocationService {
  static async createLocation(locationData) {
    const { address } = locationData;

    // Fetch latitude and longitude based on the address (using Google Maps API, for example)
    const { lat, lng } = await this.getLatLongFromAddress(address);

    // Determine timezone based on latitude and longitude
    const timeZone = geoTz(lat, lng)[0] || 'UTC';
    locationData.timeZone = timeZone;

    return await Location.create(locationData);
  }

  static async getLatLongFromAddress(address) {
    // Example using Google Maps API
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await axios.get(url);
    const location = response.data.results[0].geometry.location;
    return location;
  }
}

module.exports = LocationService;
