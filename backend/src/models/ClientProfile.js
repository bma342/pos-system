module.exports = (sequelize, DataTypes) => {
  const ClientProfile = sequelize.define('ClientProfile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branding: {
      type: DataTypes.JSONB, // Stores branding information like colors, fonts, logos, etc.
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  ClientProfile.associate = (models) => {
    ClientProfile.hasMany(models.Location, { foreignKey: 'clientId' });
    ClientProfile.hasMany(models.Menu, { foreignKey: 'clientId' });
    ClientProfile.hasMany(models.User, { foreignKey: 'clientId' });
  };

  return ClientProfile;
};

