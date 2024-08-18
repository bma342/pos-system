module.exports = (sequelize, DataTypes) => {
  const RewardSchedule = sequelize.define('RewardSchedule', {
    rewardType: {
      type: DataTypes.STRING,
      allowNull: false, // e.g., 'birthday', 'anniversary', 'monthly_item'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rewardConfig: {
      type: DataTypes.JSONB,
      allowNull: false, // e.g., { item: "Free Coffee", conditions: { ... } }
    },
    scheduleDate: {
      type: DataTypes.DATEONLY, // e.g., for yearly rewards like birthdays or half-birthdays
      allowNull: true,
    },
    recurringType: {
      type: DataTypes.STRING, // 'yearly', 'monthly', 'weekly'
      allowNull: true,
    },
  });

  RewardSchedule.associate = (models) => {
    RewardSchedule.belongsTo(models.Guest, { foreignKey: 'guestId' });
  };

  return RewardSchedule;
};
