const BaseModel = require('./BaseModel');

class Role extends BaseModel {
  static associate(models) {
    this.belongsToMany(models.RoleTemplate, {
      through: models.RoleTemplateAssignments,
      foreignKey: 'roleId',
      otherKey: 'roleTemplateId',
      as: 'AssignedTemplates'
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
    };
  }
}

module.exports = Role;