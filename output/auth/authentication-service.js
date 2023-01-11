const AccessTokenService = require('./authorization-service');
const UserService = require('./user-service');

module.exports = class AuthenticationService {
  /**
   * authenticate a user credentials
   * @param {user data} user 
   * @returns access token
   */
  static async login(user) {
    const authenticatedUser = await UserService.isPasswordAndUserMatch(user);
    console.log(authenticatedUser);
    if (authenticatedUser.error !== 0) {
      return authenticatedUser;
    }
    return AccessTokenService.createAccessToken(authenticatedUser);
  }
};
