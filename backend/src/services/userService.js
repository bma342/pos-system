const User = require('../models/User');

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

exports.updateUser = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found.');

  await user.update(updateData);
  return user;
};
