const CustomError = require("../../errors/CustomError");
const User = require("../../models/UserModel");
const comparePassword = require("./comparePassword");
const hashPassword = require("../../helpers/cryptoHelper");
const generateToken = require("../../helpers/generateToken");
const {
  loginStr,
  registerStr
} = require("../../constants/authorizationConstants");
const {
  badLogin,
  badPassword,
  errorFile,
  badBody,
  uniqueLogin
} = require("../../constants/errorsMessagesConstants");
const {
  authenticationSuccess,
  registerSuccess
} = require("../../constants/successMessagesConstants");

module.exports = async (
  userBody = {
    password: "",
    login: ""
  },
  action
) => {
  const { password, login } = userBody;
  if (!userBody || !action || password === "" || login === "") {
    throw new CustomError(errorFile + __dirname + __filename + badBody);
  }
  switch (action) {
    case registerStr:
      try {
        userBody.password = hashPassword(password);
        const registeredUser = new User(userBody);
        await registeredUser.save();
      } catch (err) {
        console.log(err);
        if(err.code === 11000){
          throw new CustomError(uniqueLogin);
        }
        throw new CustomError(err.message);
      }
      return {
        success: true,
        message: registerSuccess
      };
      break;
    case loginStr:
      const logUser = await User.find({ login }).exec();
      if (logUser.length === 1) {
        if (comparePassword(password, logUser[0].password)) {
          const token = generateToken(login);
          return {
            success: true,
            message: authenticationSuccess,
            token
          };
        }
        throw new CustomError(badPassword);
      } else {
        throw new CustomError(badLogin);
      }
      break;
    default:
      throw new CustomError(errorFile + __dirname + __filename);
  }
};
