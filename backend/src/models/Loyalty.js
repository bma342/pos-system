module.exports = (sequelize, DataTypes) => {
  const Loyalty = sequelize.define('Loyalty', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pointMultiplier: {
      type: DataTypes.FLOAT,
      defaultValue: 1.0, // Points per dollar spent
    },
    tiers: {
      type: DataTypes.JSONB, // Example: [{ name: 'Gold', requiredPoints: 1000 }, { name: 'Platinum', requiredPoints: 5000 }]
      allowNull: true,
    },
    expirationPolicy: {
      type: DataTypes.JSONB, // Example: { type: 'rolling', duration: 365 } for points expiration in days
      allowNull: true,
    },
  });

  return Loyalty;
};
