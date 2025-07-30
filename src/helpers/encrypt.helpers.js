"use strict"

// dependencies
const bcrypt = require('bcrypt');

// constants
const _SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, _SALT_ROUNDS);
    return hash;
  } catch (error) {
    console.error(`Hashing error: ${error}`);
    throw new Error("Error hashing password");
  }
};

const comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error(`"Comparing password error: ${error}`);
    throw new Error("Error hashing password");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};