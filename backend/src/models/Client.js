module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subdomain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9-]+$/, // Only allow valid subdomains
      },
    },
    primaryColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#3b82f6', // Default blue color
    },
    secondaryColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#1e40af', // Default darker blue color
    },
    accentColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#f59e0b', // Default amber color
    },
    primaryFont: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Roboto, sans-serif',
    },
    secondaryFont: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Open Sans, sans-serif',
    },
  });

  Client.associate = (models) => {
    Client.hasMany(models.Location, { foreignKey: 'clientId', as: 'locations' });
  };

  return Client;
};
