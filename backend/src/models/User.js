const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const encrypted = this.getDataValue('email');
        return decrypt(encrypted);
      },
      set(value) {
        this.setDataValue('email', encrypt(value));
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const encrypted = this.getDataValue('phone');
        return decrypt(encrypted);
      },
      set(value) {
        this.setDataValue('phone', encrypt(value));
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: DataTypes.STRING,
  });

  return User;
};

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
