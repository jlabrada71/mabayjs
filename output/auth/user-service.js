const UserRepository = require('./user-repository');
const SecretService = require('./secret-service');

module.exports = class UserService {
  static async register(user) {
    let result = {};
    try {
      const hashedPassword = SecretService.hashRandomSalt(user.password);
      const repository = new UserRepository();

      result = await repository.insert({
        username: user.username,
        password: hashedPassword,
        status: 'created',
        createDate: Date.now(),
      });
      result.error = 0;
    } catch (e) {
      result.error = 1;
      result.exception = e;
    }
    if (result.insertedCount !== 1) {
      console.log(result);
      result.error = 1;
    }
    return result;
  }

  static async updatePassword(user) {
    if (user.password) {
      let result = {};
      try {
        const hashedPassword = SecretService.hashRandomSalt(user.password);
        const repository = new UserRepository();

        result = await repository.update({ username: user.username },
          { password: hashedPassword, updateDate: Date.now() });
        result.error = 0;
      } catch (e) {
        result.error = 1;
        result.exception = e;
      }
      if (result.updatedCount !== 1) {
        console.log(result);
        result.error = 1;
      }
      return result;
    }
    return { error: 1, errorMsg: 'Expected password' };
  }

  static async isPasswordAndUserMatch(user) {
    let result = {};
    try {
      const repository = new UserRepository();
      const candidateUsers = await repository.select({ username: user.username });
      if (candidateUsers.data.length === 0) {
        result.error = 2;
        result.errorMsg = 'User not found';
        return result;
      }
      const candidateUser = candidateUsers.data[0];
      console.log(candidateUser);

      const [salt] = candidateUser.password.split('$');
      const hash = SecretService.hash(user.password, salt);
      if (hash === candidateUser.password) {
        result = {
          error: 0,
          userId: candidateUser._id,
          username: candidateUser.name,
          provider: 'username',
          name: `${candidateUser.firstName} ${candidateUser.lastName}`,
        };
        return result;
      }
      result.error = 1;
      result.errorMsg = 'Invalid email or password';
      return result;
    } catch (e) {
      result.error = 2;
      result.errorMsg = 'Internal server error';
      result.exception = e;
    }
    return result;
  }
};
