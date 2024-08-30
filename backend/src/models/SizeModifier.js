module.exports = (sequelize, DataTypes) => {
  const SizeModifier = sequelize.define('SizeModifier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posModifierId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isVanity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    vanityName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sliderConfig: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modifierGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'SizeModifiers',
    timestamps: true,
  });

  SizeModifier.associate = (models) => {
    if (models.ModifierGroup) {
      SizeModifier.belongsTo(models.ModifierGroup, { foreignKey: 'modifierGroupId' });
    }
    if (models.Client) {
      SizeModifier.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
    if (models.MenuItem) {
      SizeModifier.belongsToMany(models.MenuItem, {
        through: 'MenuItemSizeModifier',
        foreignKey: 'sizeModifierId',
        otherKey: 'menuItemId',
      });
    }
  };

  return SizeModifier;
};
