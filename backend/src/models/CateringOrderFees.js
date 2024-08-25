module.exports = (sequelize, DataTypes) => {
  const CateringOrderFees = sequelize.define('CateringOrderFees', {
    cateringOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CateringOrders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    feeType: {
      type: DataTypes.STRING, // e.g., "Delivery Fee", "Setup Fee", "Service Fee"
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isTaxable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Define whether this fee is taxable
    },
    tipAllocation: {
      type: DataTypes.STRING, // e.g., "Driver Tip", "Kitchen Tip"
      allowNull: true, // Optional, only used for tip-related fees
    },
    description: {
      type: DataTypes.TEXT, // Additional details about the fee
      allowNull: true,
    },
    isWaivable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Allows certain fees to be waived if applicable
    },
    feeCategory: {
      type: DataTypes.STRING, // e.g., "Operational", "Administrative", "Gratuity"
      allowNull: true,
    },
  });

  CateringOrderFees.associate = (models) => {
    CateringOrderFees.belongsTo(models.CateringOrder, { foreignKey: 'cateringOrderId' });
  };

  return CateringOrderFees;
};

