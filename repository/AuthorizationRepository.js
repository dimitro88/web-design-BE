const authService = require('../service/AuthService/index');
const { loginStr, registerStr } = require('../constants/authorizationConstants');

module.exports = class AuthorizationRepository {

  static async login(userBody){
    return await authService(userBody, loginStr)
  }

  static async register(userBody){
    return await authService(userBody, registerStr)
  }

};