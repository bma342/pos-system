module.exports = (sequelize, DataTypes) => {
  const GuestProfile = sequelize.define('GuestProfile', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favoriteMenuItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfOrders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avgOrderSize: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  // Define associations if necessary
  GuestProfile.associate = (models) => {
    GuestProfile.hasMany(models.Order, { foreignKey: 'guestId' });
  };

  return GuestProfile;
};
