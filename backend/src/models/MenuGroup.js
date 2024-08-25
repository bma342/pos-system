module.exports = (sequelize, DataTypes) => {
  const MenuGroup = sequelize.define('MenuGroup', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    posGroupId: {
      type: DataTypes.STRING,
      allowNull: true, // Used to store the ID for POS integrations
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // URL for the group's image
    },
    upliftSettings: {
      type: DataTypes.JSONB, // JSON field to store uplift settings (e.g., {"DoorDash": 18, "UberEats": 25})
      allowNull: true,
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
    isMiniSiteEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this group is part of a mini-site
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // To control the order in which groups are displayed
    },
  });

  MenuGroup.associate = (models) => {
    MenuGroup.belongsTo(models.Menu, { foreignKey: 'menuId' });
    MenuGroup.hasMany(models.MenuItem, { foreignKey: 'menuGroupId' });
    MenuGroup.belongsToMany(models.Location, {
      through: 'LocationMenuGroup',
      foreignKey: 'menuGroupId',
      otherKey: 'locationId',
    });

    // A/B testing association for analytics
    MenuGroup.hasMany(models.MenuItemAnalytics, { foreignKey: 'menuGroupId' });

    // Association for tracking usage in mini-sites
    MenuGroup.hasMany(models.MiniSite, { foreignKey: 'menuGroupId' });

    // Relationship to POS integration profile, if applicable
    MenuGroup.belongsTo(models.CorePOSProfile, { foreignKey: 'corePOSProfileId' });
  };

  return MenuGroup;
};
