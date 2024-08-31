const BaseModel = require('./BaseModel');

class RoleTemplate extends BaseModel {
  static associate(models) {
    this.belongsToMany(models.Role, {
      through: models.RoleTemplateAssignments, // Make sure this model exists
      foreignKey: 'roleTemplateId',
      otherKey: 'roleId',
      as: 'AssignedRoles'
    });
  }

  static modelAttributes(DataTypes) {
    return {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isEditable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isPredefined: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    };
  }
}

module.exports = RoleTemplate;