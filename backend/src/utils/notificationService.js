const admin = require('firebase-admin');
const { User } = require('../models');

const sendNotification = async (userId, message) => {
  try {
    const user = await User.findByPk(userId);
    if (user && user.fcmToken) {
      await admin.messaging().send({
        token: user.fcmToken,
        notification: {
          title: 'Order Update',
          body: message,
        },
      });
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = {
  sendNotification
};