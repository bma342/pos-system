module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    PosGUID: {
      type: DataTypes.STRING, // Storing POS-specific GUID
      allowNull: true,
    },
    isGlobal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Indicates if this menu is global across all locations
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0, // Optional uplift percentage for the menu
    },
    abTestGroup: {
      type: DataTypes.STRING, // A/B testing group (e.g., 'A', 'B')
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    showReviews: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Allows toggling reviews visibility
    },
    isMiniSiteEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this menu is part of a mini-site
    },
    miniSiteSettings: {
      type: DataTypes.JSONB, // JSON field to store mini-site specific settings
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this menu is archived
    },
  });

  Menu.associate = (models) => {
    Menu.belongsTo(models.Client, { foreignKey: 'clientId' });
    Menu.hasMany(models.MenuGroup, { foreignKey: 'menuId', as: 'menuGroups' });
    Menu.belongsToMany(models.Location, { through: 'LocationMenu', foreignKey: 'menuId', as: 'locations' });

    // A/B testing association for analytics
    Menu.hasMany(models.MenuItemAnalytics, { foreignKey: 'menuId' });

    // Association for mini-site functionality
    Menu.hasMany(models.MiniSite, { foreignKey: 'menuId' });
  };

  return Menu;
};

