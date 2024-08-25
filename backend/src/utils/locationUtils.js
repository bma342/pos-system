const axios = require('axios');

/**
 * Get coordinates (latitude and longitude) from an address using a geocoding API.
 * @param {string} address - The address to geocode.
 * @returns {Object} An object containing latitude and longitude.
 */
async function getCoordinatesFromAddress(address) {
  try {
    // Use a geocoding API (e.g., Google Geocoding API, OpenStreetMap, etc.)
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        q: address,
        key: process.env.GEOCODING_API_KEY, // Replace with your geocoding API key
      },
    });

    const { lat, lng } = response.data.results[0].geometry;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw new Error('Unable to fetch coordinates for the provided address.');
  }
}

module.exports = { getCoordinatesFromAddress };
