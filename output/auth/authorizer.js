const AuthorizationService = require('./authorization-service');
const {log, debug} = require('../lib/logger');

function getAuthorization(authorization) {
  log(authorization);
  log(authorization.split(' '))
  const [type, value ] = authorization.split(' ');
  return {type, value}
}

async function authorizer(req, res, next) {
  if (!req.headers.authorization) {
    log('Missing authorization info');
    return res.status(403).send('Missing authorization');
  }

  try {
    const authorization = getAuthorization(req.headers.authorization);
    const validations = {
      apikey: AuthorizationService.validateApiKey,
      bearer: AuthorizationService.validateAccessToken
    }

    const type = typeof authorization.type === 'string' ? authorization.type.toLowerCase() : void 0;
    debug(type)
    debug(authorization.value)

    const validation = validations[type]

    if (!validation) {
      return res.status(403).send('Missing authorization')
    }

    const validationResult = await validation(authorization.value)
    if (validationResult.error !== 0) {
      return res.status(403).send(validationResult)
    }
    next();
  } catch( err ) {
    log(err);
    res.status(403).send({ errors: err });
  }
}

module.exports = authorizer;
