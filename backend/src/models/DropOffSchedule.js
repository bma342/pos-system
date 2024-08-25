module.exports = (sequelize, DataTypes) => {
  const DropOffSchedule = sequelize.define('DropOffSchedule', {
    dropOffSpotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DropOffSpots',
        key: 'id',
      },
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });

  DropOffSchedule.associate = (models) => {
    DropOffSchedule.belongsTo(models.DropOffSpot, { foreignKey: 'dropOffSpotId', as: 'dropOffSpot' });
  };

  return DropOffSchedule;
};
