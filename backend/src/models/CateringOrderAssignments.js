module.exports = (sequelize, DataTypes) => {
  const CateringOrderAssignments = sequelize.define('CateringOrderAssignments', {
    cateringOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CateringOrders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DeliveryDrivers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    commissaryKitchenId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, for commissary kitchen assignment
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    deliveryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Status can be 'pending', 'in-progress', 'completed', 'cancelled'
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Nullable, filled when delivery is completed
    },
    reassigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Flag to indicate if the assignment was reassigned
    },
    reassignedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional field for driver/admin notes related to the assignment
    },
  });

  CateringOrderAssignments.associate = (models) => {
    CateringOrderAssignments.belongsTo(models.CateringOrder, { foreignKey: 'cateringOrderId' });
    CateringOrderAssignments.belongsTo(models.DeliveryDriver, { foreignKey: 'driverId' });
    CateringOrderAssignments.belongsTo(models.Location, { foreignKey: 'commissaryKitchenId' });

    // Optional: Additional association with audit logs or reassignment history
    CateringOrderAssignments.hasMany(models.AuditLog, { foreignKey: 'assignmentId', as: 'auditLogs' });
  };

  return CateringOrderAssignments;
};
