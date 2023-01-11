const nJwt = require('njwt');
const secureRandom = require('secure-random');
const SecretService = require('./secret-service');
const AccessTokenRepository = require('./access-token-repository');
const ApiKeyRepository = require('./api-key-repository');
const {log, debug} = require('../lib/logger');

module.exports = class AuthorizationService {
  static async createAccessToken(user) {
    const signingKey = secureRandom(256, { type: 'Buffer' });
    const base64SigningKey = signingKey.toString('base64');
    const refreshId = user.userId + base64SigningKey;

    const salt = SecretService.getRandomSalt();
    user.refreshKey = salt;

    const jwt = nJwt.create(user, signingKey);
    // jwt.setExpiration(new Date('2015-07-01')); // A specific date
    // jwt.setExpiration(new Date().getTime() + (60*60*1000)); // One hour from now
    jwt.setExpiration(); // Remove the exp claim
    // jwt.setNotBefore(new Date('2015-07-01')); // token is active from this date
    // jwt.setNotBefore(new Date().getTime() + (60*60*1000)); // One hour from now
    // jwt.setNotBefore(); // Remove the NotBefore claim
    const accessToken = jwt.compact();

    const hashRefreshId = SecretService.hash(refreshId, salt);
    const b = Buffer.from(hashRefreshId);
    const refreshToken = b.toString('base64');

    const repository = new AccessTokenRepository();
    await repository.insert({
      userId: user.userId,
      accessToken,
      refreshToken,
      base64SigningKey,
    });
    return {
      error: 0, userId: user.userId, accessToken, refreshToken
    };
  }

  static async createTestApiKey() {
    const apiKeyData = {
      id: 'test1',
      creationDate: Date.now(),
    };

    const apiKey = await AuthorizationService.createApiKey(apiKeyData);
    console.log(apiKey);
  }

  static async validateAccessToken(token) {
    const repository = new AccessTokenRepository();
    const result = await repository.select({ accessToken: token });

    if (result.lenth === 0) {
      return {
        error: 1,
        errorMsg: 'Invalid access token',
      };
    }

    const accessTokenData = result[0];

    const signingKey = Buffer.from(accessTokenData.base64SigningKey, 'base64');

    const verifiedJwt = nJwt.verify(token, signingKey);
    // verify the accessToken expiration
    console.log('AccessToken validation result');
    console.log(verifiedJwt);

    return { error: 0, accessToken : verifiedJwt };
  }

  static async createApiKey(api) {
    const signingKey = secureRandom(256, { type: 'Buffer' });
    const base64SigningKey = signingKey.toString('base64');
    const refreshId = api.id + base64SigningKey;

    const salt = SecretService.getRandomSalt();
    api.refreshKey = salt;

    const jwt = nJwt.create(api, signingKey);

    jwt.setExpiration(); // Remove the exp claim
    const apiKey = jwt.compact();

    const hashRefreshId = SecretService.hash(refreshId, salt);
    const b = Buffer.from(hashRefreshId);
    const refreshApiKey = b.toString('base64');

    const repository = new ApiKeyRepository();
    await repository.insert({
      apiId: api.id,
      creationDate: api.creationDate,
      apiKey,
      refreshApiKey,
      base64SigningKey,
    });
    return { error: 0, apiKey, refreshApiKey };
  }

  static async validateApiKey(apiKey) {
    const repository = new ApiKeyRepository();
    const result = await repository.select({ apiKey });

    if (result.length === 0) {
      return {
        error: 2,
        errorMsg: 'Invalid api key',
      };
    }

    const apiKeyData = result[0];

    const newSigningKey = Buffer.from(apiKeyData.base64SigningKey, 'base64');

    const verifiedJwt = nJwt.verify(apiKey, newSigningKey);

    return { error: 0, apiKey: verifiedJwt };
  }
};
