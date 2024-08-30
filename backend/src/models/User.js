const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
      defaultValue: () => crypto.randomBytes(20).toString('hex'),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  // Hash password before saving to the database
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Associations
  User.associate = (models) => {
    // User belongs to a Role
    User.belongsTo(models.Role, { foreignKey: 'roleId' });

    // User belongs to a Client
    User.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Additional associations for role and permission management
    User.belongsToMany(models.Permission, {
      through: models.RolePermissions,
      foreignKey: 'userId',
      otherKey: 'permissionId',
    });

    // Audit logging association
    User.hasMany(models.AuditLog, { foreignKey: 'userId' });
  };

  return User;
};

// Encryption and decryption functions
function encrypt(text) {
  if (!process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
    throw new Error('Encryption key or IV is missing.');
  }
  const ivBuffer = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), ivBuffer);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(text) {
  if (!process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
    throw new Error('Encryption key or IV is missing.');
  }
  const ivBuffer = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), ivBuffer);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
