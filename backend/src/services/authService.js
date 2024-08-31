const speakeasy = require 'speakeasy';
const { User } = require '../models';

const generateTwoFactorSecret = () => {
  return speakeasy.generateSecret({ length: 32 });
};

const verifyTwoFactor = (token, secret) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });
};

const enableTwoFactor = async (userId, secret) => {
  await User.update({ twoFactorSecret, twoFactorEnabled }, { where: { id } });
};

const disableTwoFactor = async (userId) => {
  await User.update({ twoFactorSecret, twoFactorEnabled }, { where: { id } });
};