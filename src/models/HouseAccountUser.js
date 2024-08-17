module.exports = (sequelize, DataTypes) => {
  const HouseAccountUser = sequelize.define('HouseAccountUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  HouseAccountUser.associate = (models) => {
    HouseAccountUser.belongsTo(models.User, { foreignKey: 'userId' });
    HouseAccountUser.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
  };

  return HouseAccountUser;
};
