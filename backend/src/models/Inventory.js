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
        min: 0, // Ensure inventory count is non-negative
      },
    },
    onlineInventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure online inventory count is non-negative
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

  // Add lifecycle hooks for inventory changes
  Inventory.addHook('beforeUpdate', (inventory, options) => {
    if (inventory.posCount < 0 || inventory.onlineInventory < 0) {
      throw new Error('Inventory count cannot be negative');
    }

    // Example: Trigger low inventory alert if the onlineInventory drops below a threshold
    if (inventory.onlineInventory < 10) {
      // Logic for triggering a notification (e.g., send an alert)
      console.log(`Alert: Low online inventory for item ${inventory.itemId} at location ${inventory.locationId}`);
    }
  });

  return Inventory;
};
