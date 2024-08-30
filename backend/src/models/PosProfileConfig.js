module.exports = (sequelize, DataTypes) => {
  const PosProfileConfig = sequelize.define('PosProfileConfig', {
    posProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PosProfiles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    apiEndpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'PosProfileConfigs',
    timestamps: true,
  });

  PosProfileConfig.associate = (models) => {
    PosProfileConfig.belongsTo(models.PosProfile, { foreignKey: 'posProfileId' });
  };

  return PosProfileConfig;
};
