const { TimeSlot, Order } = require '../models';
const { Op } = require 'sequelize';

const getAvailableTimeSlots = async (date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  return TimeSlot.findAll({
    where: {
      startTime: {
        [Op.between]: [startOfDay, endOfDay],
      },
      bookedCount: {
        [Op.lt].col('capacity'),
      },
    },
  });
};

const bookTimeSlot = async (timeSlotId, orderId) => {
  const timeSlot = await TimeSlot.findByPk(timeSlotId);
  if (!timeSlot || timeSlot.bookedCount >= timeSlot.capacity) {
    throw new Error('Time slot not available');
  }

  await timeSlot.increment('bookedCount');
  await Order.update({ timeSlotId }, { where: { id } });
};