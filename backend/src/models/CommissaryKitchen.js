module.exports = (sequelize, DataTypes) => {
  const CommissaryKitchen = sequelize.define('CommissaryKitchen', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    syncFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Flag to indicate this kitchen is part of POS sync for catering
    },
  });

  CommissaryKitchen.associate = (models) => {
    CommissaryKitchen.belongsTo(models.Location, { foreignKey: 'locationId' });
    CommissaryKitchen.hasMany(models.CateringOrder, { foreignKey: 'commissaryKitchenId' }); // Link orders handled by this kitchen
  };

  return CommissaryKitchen;
};
