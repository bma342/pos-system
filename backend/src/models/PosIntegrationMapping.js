module.exports = (sequelize, DataTypes) => {
  const PosIntegrationMapping = sequelize.define('PosIntegrationMapping', {
    integrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PosIntegrationSettings',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    systemFieldName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posFieldName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataType: {
      type: DataTypes.STRING, // 'string', 'number', 'boolean', etc.
      allowNull: false,
    },
    transformationRule: {
      type: DataTypes.TEXT, // Optional transformation logic to apply before mapping (e.g., convert currency)
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING, // 'toPos' or 'fromPos' to indicate mapping direction
      allowNull: false,
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Whether this field is required for successful integration
    },
  });

  PosIntegrationMapping.associate = (models) => {
    PosIntegrationMapping.belongsTo(models.PosIntegrationSettings, { foreignKey: 'integrationId', onDelete: 'CASCADE' });
  };

  return PosIntegrationMapping;
};
