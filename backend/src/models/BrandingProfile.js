module.exports = (sequelize, DataTypes) => {
  const BrandingProfile = sequelize.define('BrandingProfile', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colors: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schedule: {
      type: DataTypes.JSONB,
      allowNull: true, // Holds start and end date for scheduling themes
    },
    navigationButtons: {
      type: DataTypes.JSONB, // Optional branded navigation buttons
      allowNull: true,
    },
    imageRestrictions: {
      type: DataTypes.JSONB, // Restrictions on file types, sizes, dimensions
      allowNull: true,
    },
  });

  BrandingProfile.associate = (models) => {
    BrandingProfile.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return BrandingProfile;
};
