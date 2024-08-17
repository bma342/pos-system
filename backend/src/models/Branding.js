module.exports = (sequelize, DataTypes) => {
  const Branding = sequelize.define('Branding', {
    primaryColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondaryColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tertiaryColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fontColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondaryFontColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fontFamily: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Arial',
    },
    buttonShape: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'rounded', // Options: 'rounded', 'sharp'
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backgroundUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    faviconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Branding;
};
