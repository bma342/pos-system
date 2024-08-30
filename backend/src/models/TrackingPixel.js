module.exports = (sequelize, DataTypes) => {
  const TrackingPixel = sequelize.define('TrackingPixel', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    type: {
      type: DataTypes.ENUM('TikTok', 'GTM', 'Meta', 'Other'),
      allowNull: false,
    },
    pixelId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isGlobal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'TrackingPixels',
    timestamps: true,
  });

  TrackingPixel.associate = (models) => {
    TrackingPixel.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return TrackingPixel;
};
