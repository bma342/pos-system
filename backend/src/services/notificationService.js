const db = require('../models');
const logger = require('./logger');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const nodemailer = require('nodemailer');

class NotificationService {
  // Send email or SMS based on the notification type
  async sendNotification(recipient, message, notificationType) {
    try {
      if (notificationType === 'email') {
        await this.sendEmail(recipient, message);
      } else if (notificationType === 'sms') {
        await this.sendSMS(recipient, message);
      }

      // Update the notification status in the database
      await db.Notification.update({ status: 'sent' }, { where: { recipient } });

      logger.info(`Notification sent: ${notificationType} to ${recipient}`);
    } catch (error) {
      await db.Notification.update({ status: 'failed' }, { where: { recipient } });
      logger.error(`Error sending notification: ${error.message}`);
      throw error;
    }
  }

  // Send an email
  async sendEmail(recipient, message) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: recipient,
      subject: 'Notification',
      text: message,
    };

    await transporter.sendMail(mailOptions);
  }

  // Send an SMS
  async sendSMS(recipient, message) {
    await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipient,
    });
  }
}

module.exports = new NotificationService();
