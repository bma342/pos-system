const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class GuestProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

GuestProfile.attributes = attributes = {
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Guests', key: 'id' }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preferences: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  GuestProfile.init(GuestProfile.attributes, {
    sequelize,
    modelName: 'GuestProfile',
    tableName: 'guestprofiles', // Adjust this if needed
  });
  return GuestProfile
};