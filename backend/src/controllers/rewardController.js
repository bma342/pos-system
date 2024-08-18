const RewardSchedule = require('../models/RewardSchedule');
const Guest = require('../models/Guest');

exports.checkAndTriggerRewards = async () => {
  const today = new Date().toISOString().slice(0, 10);

  // Find all rewards scheduled for today
  const rewards = await RewardSchedule.findAll({ where: { scheduleDate: today } });

  for (const reward of rewards) {
    // Trigger the reward based on its type
    switch (reward.rewardType) {
      case 'birthday':
        console.log(`Triggering birthday reward for Guest ${reward.guestId}:`, reward.rewardConfig);
        break;
      case 'anniversary':
        console.log(`Triggering anniversary reward for Guest ${reward.guestId}:`, reward.rewardConfig);
        break;
      case 'monthly_item':
        console.log(`Triggering monthly item reward for Guest ${reward.guestId}:`, reward.rewardConfig);
        break;
      default:
        console.log(`Unknown reward type for Guest ${reward.guestId}:`, reward.rewardType);
    }
  }
};

// Function to create or update a reward schedule for a guest
exports.createOrUpdateRewardSchedule = async (req, res) => {
  const { guestId, rewardType, description, rewardConfig, recurringType } = req.body;

  try {
    const guest = await Guest.findByPk(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    let scheduleDate;

    switch (rewardType) {
      case 'birthday':
        scheduleDate = guest.birthday;
        break;
      case 'anniversary':
        scheduleDate = guest.signUpDate;
        break;
      default:
        scheduleDate = new Date(); // For monthly or other triggers
    }

    const rewardSchedule = await RewardSchedule.create({
      guestId,
      rewardType,
      description,
      rewardConfig,
      scheduleDate,
      recurringType,
    });

    res.status(201).json(rewardSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reward schedule', error });
  }
};
