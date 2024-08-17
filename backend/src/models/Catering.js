module.exports = (sequelize, DataTypes) => {
  const Catering = sequelize.define('Catering', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Catering.associate = (models) => {
    Catering.belongsTo(models.Location, { foreignKey: 'locationId' });
    Catering.hasMany(models.MenuItem, { foreignKey: 'cateringId' });
  };

  return Catering;
};
