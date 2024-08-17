module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
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
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Optional for social logins
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    appleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaId: {
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
    averageOrderSize: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    lastOrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    marketingPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  });

  Guest.associate = (models) => {
    Guest.hasMany(models.Order, { foreignKey: 'guestId' });
  };

  return Guest;
};
