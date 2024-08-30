module.exports = (sequelize, DataTypes) => {
  const BrandingProfile = sequelize.define('BrandingProfile', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    primaryColor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secondaryColor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fontFamily: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customCss: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  BrandingProfile.associate = (models) => {
    BrandingProfile.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return BrandingProfile;
};
