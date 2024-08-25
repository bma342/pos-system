module.exports = (sequelize, DataTypes) => {
  const SizeModifier = sequelize.define('SizeModifier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Name of the size, e.g., "Small", "Medium", "Large", "XL"
    },
    posModifierId: {
      type: DataTypes.STRING,
      allowNull: true, // ID from the POS system
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false, // Position on the slider (0 for leftmost, 1 for next, etc.)
    },
    isVanity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this is a vanity name
    },
    vanityName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional vanity name, e.g., "Petite" instead of "Small"
    },
    sliderConfig: {
      type: DataTypes.JSONB, // Stores custom slider configuration (e.g., {"min": -2, "max": 2, "default": 0})
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      allowNull: false,
    },
    modifierGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ModifierGroups',
        key: 'id',
      },
      allowNull: false,
    },
  });

  SizeModifier.associate = (models) => {
    SizeModifier.belongsTo(models.ModifierGroup, { foreignKey: 'modifierGroupId' });
    SizeModifier.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Association with MenuItem for the guest UI slider
    SizeModifier.belongsToMany(models.MenuItem, {
      through: 'MenuItemSizeModifier',
      foreignKey: 'sizeModifierId',
      otherKey: 'menuItemId',
    });
  };

  return SizeModifier;
};
