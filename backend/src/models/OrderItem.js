const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class OrderItem extends BaseModel {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      menuItemId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      specialInstructions: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'OrderItem'
    });
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'orderId' });
    this.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    this.hasMany(models.Modifier, { foreignKey: 'orderItemId' });
  }
}

module.exports = OrderItem;
