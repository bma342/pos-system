const moment = require('moment-timezone');

/**
 * Convert date and time based on the location's timezone.
 * @param {Date} date - The date to convert.
 * @param {string} timezone - The location's timezone.
 * @returns {Date} The converted date.
 */
function convertToTimezone(date, timezone) {
  return moment(date).tz(timezone).toDate();
}

/**
 * Calculate the remaining time until a specific date.
 * @param {Date} targetDate - The target date.
 * @returns {string} The formatted remaining time (e.g., '2 hours left').
 */
function getTimeUntil(targetDate) {
  const now = moment();
  const target = moment(targetDate);
  const duration = moment.duration(target.diff(now));

  if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())} hours left`;
  }
  return `${Math.floor(duration.asMinutes())} minutes left`;
}

/**
 * Get the "pretty" time slots in 15-minute intervals.
 * @param {Date} startTime - The starting time.
 * @returns {Array<string>} An array of time slots (e.g., ['1:15 PM', '1:30 PM']).
 */
function getPrettyTimeSlots(startTime) {
  const slots = [];
  const roundedStart = moment(startTime).startOf('minute').add(15 - (startTime.getMinutes() % 15), 'minutes');

  for (let i = 0; i < 24; i++) {
    slots.push(roundedStart.format('h:mm A'));
    roundedStart.add(15, 'minutes');
  }
  return slots;
}

module.exports = {
  convertToTimezone,
  getTimeUntil,
  getPrettyTimeSlots,
};
