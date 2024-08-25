module.exports = (sequelize, DataTypes) => {
  const MiniSite = sequelize.define('MiniSite', {
    siteName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    themeSettings: {
      type: DataTypes.JSONB, // Store branding options like colors, fonts, logos, etc.
      allowNull: true,
    },
    contentBlocks: {
      type: DataTypes.JSONB, // Store content like images, text sections, CTAs
      allowNull: true,
    },
    menuGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MenuGroups',
        key: 'id',
      },
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if the mini-site is live
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Set the date when the mini-site is published
    },
  });

  MiniSite.associate = (models) => {
    MiniSite.belongsTo(models.MenuGroup, { foreignKey: 'menuGroupId' });
    MiniSite.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Optionally include analytics and tracking
    MiniSite.hasMany(models.MiniSiteAnalytics, { foreignKey: 'miniSiteId' });
  };

  return MiniSite;
};
