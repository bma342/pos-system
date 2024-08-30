module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    onlineInventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Item, { foreignKey: 'itemId' });
    Inventory.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  Inventory.addHook('beforeUpdate', async (inventory, options) => {
    if (inventory.posCount < 0 || inventory.onlineInventory < 0) {
      throw new Error('Inventory count cannot be negative');
    }

    if (inventory.onlineInventory < 10) {
      if (!options.transaction) {
        options.transaction = await sequelize.transaction();
      }
      
      await sequelize.models.Alert.create({
        type: 'LOW_INVENTORY',
        message: `Low online inventory for item ${inventory.itemId} at location ${inventory.locationId}`,
        itemId: inventory.itemId,
        locationId: inventory.locationId
      }, { transaction: options.transaction });
    }
  });

  return Inventory;
};
