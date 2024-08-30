module.exports = (sequelize, DataTypes) => {
  const ItemModifier = sequelize.define('ItemModifier', {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    modifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modifiers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    priceAdjustment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {
    tableName: 'ItemModifiers',
    timestamps: true,
  });

  ItemModifier.associate = (models) => {
    ItemModifier.belongsTo(models.Item, { foreignKey: 'itemId' });
    ItemModifier.belongsTo(models.Modifier, { foreignKey: 'modifierId' });
  };

  return ItemModifier;
};
