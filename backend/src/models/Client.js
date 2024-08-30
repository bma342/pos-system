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
      set(value) {
        this.setDataValue('subdomain', value.toLowerCase()); // Ensure lowercase subdomains
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    brandingOptions: {
      type: DataTypes.JSONB, // Stores more detailed branding options if needed
      allowNull: true,
    },
posProfile: {
  type: DataTypes.INTEGER,
  references: {
    model: 'CorePOSProfiles',
    key: 'id',
  },
      allowNull: true, // Optional, default Core POS Profile for the client
    },
    clientSettings: {
      type: DataTypes.JSONB, // Store settings specific to the client, such as marketing preferences
      allowNull: true,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Clients',
    timestamps: true,
  });

  Client.associate = (models) => {
    Client.hasMany(models.Location, { foreignKey: 'clientId', as: 'locations' });
    Client.hasMany(models.PosIntegration, { foreignKey: 'clientId', as: 'posIntegrations' });
    Client.hasMany(models.Role, { foreignKey: 'clientId', as: 'roles' });
    Client.hasMany(models.Permission, { foreignKey: 'clientId', as: 'permissions' });
    Client.hasMany(models.RoleTemplate, { foreignKey: 'clientId', as: 'roleTemplates' });
    Client.hasMany(models.MiniSite, { foreignKey: 'clientId', as: 'miniSites' }); // Association for mini-sites
    Client.hasMany(models.LoyaltyProgram, { foreignKey: 'clientId', as: 'loyaltyPrograms' });
    Client.hasMany(models.MarketingReport, { foreignKey: 'clientId', as: 'marketingReports' });
    Client.hasOne(models.Wallet, { foreignKey: 'clientId', as: 'clientWallet' }); // Association for client-specific wallets
  };

  return Client;
};
