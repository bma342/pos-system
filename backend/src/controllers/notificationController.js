const NotificationService = require('../services/notificationService');
const logger = require('../services/logger');

// Send a notification (email/SMS) based on type
exports.sendNotification = async (req, res) => {
  try {
    const { recipient, message, notificationType } = req.body;

    await NotificationService.sendNotification(recipient, message, notificationType);

    res.status(200).json({ message: `Notification sent to ${recipient}` });
  } catch (error) {
    logger.error(`Error sending notification: ${error.message}`);
    res.status(500).json({ message: 'Error sending notification', error });
  }
};
