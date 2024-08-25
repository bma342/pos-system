module.exports = (sequelize, DataTypes) => {
  const LoyaltyChallengeProgress = sequelize.define('LoyaltyChallengeProgress', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    loyaltyChallengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LoyaltyChallenges',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    progress: {
      type: DataTypes.JSONB,
      allowNull: false, // Store details like current counts, steps completed, etc.
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if the challenge is completed
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Set when the challenge is completed
    },
    rewardClaimed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Track whether the reward has been claimed
    },
    claimDate: {
      type: DataTypes.DATE,
      allowNull: true, // Set when the reward is claimed
    },
  });

  LoyaltyChallengeProgress.associate = (models) => {
    LoyaltyChallengeProgress.belongsTo(models.Guest, { foreignKey: 'guestId' });
    LoyaltyChallengeProgress.belongsTo(models.LoyaltyChallenge, { foreignKey: 'loyaltyChallengeId' });

    // Optional associations for more detailed tracking
    LoyaltyChallengeProgress.hasMany(models.Order, { foreignKey: 'loyaltyChallengeProgressId' });
  };

  // Hooks or methods for managing challenge progress
  LoyaltyChallengeProgress.prototype.updateProgress = async function (newProgressData) {
    this.progress = { ...this.progress, ...newProgressData };
    if (this.isChallengeCompleted()) {
      this.isCompleted = true;
      this.completedAt = new Date();
    }
    await this.save();
  };

  LoyaltyChallengeProgress.prototype.isChallengeCompleted = function () {
    // Custom logic to determine if the challenge is completed
    // Example: return this.progress.itemCount >= requiredItemCount;
  };

  return LoyaltyChallengeProgress;
};

