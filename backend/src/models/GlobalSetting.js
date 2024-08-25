module.exports = (sequelize, DataTypes) => {
  const GlobalSetting = sequelize.define('GlobalSetting', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return GlobalSetting;
};
