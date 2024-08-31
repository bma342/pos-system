const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { UserRole } = require('../types/enums');
const { CreateUserDto, UpdateUserDto } = require('../types/dto/user');
const { NotFoundError, ConflictError } = require('../utils/errors');

const createUser = async (userData) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: userData.username }, { email: userData.email }],
    },
  });

  if (existingUser) {
    throw new ConflictError('Username or email already exists');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
};

const updateUser = async (id, updateData) => {
  const user = await getUserById(id);
  
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  await user.update(updateData);
  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  await user.destroy();
};

const getUserByUsername = async (username) => {
  return User.findOne({ where: { username } });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
};