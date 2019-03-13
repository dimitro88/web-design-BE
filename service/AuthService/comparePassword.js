const hashPassword = require('../../helpers/cryptoHelper');
const CustomError = require("../../errors/CustomError");
const { errorFile } = require('../../constants/errorsMessagesConstants');

const comparePassword = (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) {
      return false;
    }
    return hashedPassword === hashPassword(password);
  } catch (err) {
    return new CustomError(errorFile + __dirname + __filename);
  }
};

module.exports = comparePassword;
