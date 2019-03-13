const jwt = require("jsonwebtoken");
const config = require("../../options/server");
const CustomError = require("../../errors/CustomError");
const { badToken } = require("../../constants/errorsMessagesConstants");

module.exports = token =>
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return new CustomError(badToken);
    }
    return {
      success: true,
      decoded
    };
  });
