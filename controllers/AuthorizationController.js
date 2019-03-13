const authorizationRepository = new require(
  "../repository/AuthorizationRepository"
);
const { register, login } = authorizationRepository;
const { handleOk } = require("../helpers/DatabaseHelpers/dbHelper");
const { loginAPI, registerAPI } = require("../constants/apiConstants");

class AuthorizationController {
  constructor() {
    this.name = "AuthorizationController";
  }

  postLogin() {
    return {
      url: loginAPI,
      func: (req, res) => handleOk(res, login(req.body))
    };
  }

  postRegister() {
    return {
      url: registerAPI,
      func: (req, res) => handleOk(res, register(req.body))
    };
  }
}

module.exports = AuthorizationController;
