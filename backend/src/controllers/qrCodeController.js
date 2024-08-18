const QRCode = require('qrcode');
const Guest = require('../models/Guest');

// Endpoint to generate QR code for scan-to-pay or scan-for-loyalty
exports.generateQRCode = async (req, res) => {
  const { guestId, actionType } = req.body; // actionType could be "pay" or "loyalty"

  try {
    const guest = await Guest.findByPk(guestId);

    if (!guest) {
      return res.status(404).json({ message: 'Guest not found.' });
    }

    // Generate QR code data
    const qrData = {
      guestId: guest.id,
      actionType,
      timestamp: new Date().toISOString(),
    };

    const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrData));

    res.json({ qrCode: qrCodeImage });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code', error });
  }
};
