const crypto = require('crypto');

module.exports = class SecretService {
  /**
   * 
   * @returns based64 random salt
   */
  static getRandomSalt() {
    return crypto.randomBytes(16).toString('base64');
  }

  /**
   * This function hashes a payload given a salt
   * @param {string} payload 
   * @param {base64} salt 
   * @returns string base64 
   */
  static hash(payload, salt) {
    // const shaPass = crypto.createHash('sha256').update(password).digest('hex');
    const hash = crypto.createHmac('sha512', salt)
      .update(payload)
      .digest('base64');
    return `${salt}$${hash}`;
  }

  /**
   * 
   * @param {string} payload 
   * @returns hashed payload with a random salt
   */
  static hashRandomSalt(payload) {
    const salt = SecretService.getRandomSalt();
    return SecretService.hash(payload, salt);
  }
};
