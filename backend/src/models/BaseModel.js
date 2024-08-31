const { Model, DataTypes } = require('sequelize');

class BaseModel extends Model {
  static init(sequelize) {
    if (!this.modelAttributes || typeof this.modelAttributes !== 'function') {
      throw new Error(`modelAttributes method must be implemented by ${this.name}`);
    }
    const attributes = this.modelAttributes(DataTypes);
    return super.init(attributes, { sequelize, modelName: this.name });
  }

  static getModelName() {
    return this.name;
  }
}

module.exports = BaseModel;