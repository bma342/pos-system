const moment = require('moment-timezone');

/**
 * Automatically determine the timezone based on a location's address.
 * @param {string} address - The address of the location.
 * @returns {string} The determined timezone (e.g., 'America/New_York').
 */
function getTimezoneFromAddress(address) {
  // Mocked function to determine timezone based on location address
  if (address.includes('New York')) {
    return 'America/New_York';
  }
  return 'America/Los_Angeles';
}

/**
 * Convert a date to a location's timezone.
 * @param {Date} date - The date to convert.
 * @param {string} timezone - The timezone to convert to.
 * @returns {Date} The converted date.
 */
function convertToLocationTimezone(date, timezone) {
  return moment(date).tz(timezone).toDate();
}

module.exports = {
  getTimezoneFromAddress,
  convertToLocationTimezone,
};
