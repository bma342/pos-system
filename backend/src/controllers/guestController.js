const Guest = require('../models/Guest');

exports.getGuestProfile = async (req, res) => {
  const { guestId } = req.params;

  try {
    const guest = await Guest.findByPk(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found.' });

    res.json({
      ...guest.toJSON(),
      engagementScore: guest.engagementScore, // Include engagement score
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest profile', error });
  }
};
