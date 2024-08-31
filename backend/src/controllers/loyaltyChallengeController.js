exports.getGuestChallengeProgress = async (req, res) => {
  try {
    const { guestId } = req.params;
    const progress = await LoyaltyChallengeProgress.findAll({
      where: { guestId },
      include: [{ model: LoyaltyChallenge, where: { status: 'active' } }]
    });
    res.json(progress);
  } catch (error) {
    console.error('Error fetching guest challenge progress:', error);
    res.status(500).json({ message: 'Error fetching guest challenge progress' });
  }
};