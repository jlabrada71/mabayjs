const express = require('express');
const AuthorizationService = require('./authorization-service');

const router = express.Router();

function handleError(resource, reason, message, code) {
  console.log(`ERROR: ${reason}:${message}`);
  resource.status(code || 500).json({ error: message });
}

function returnResult(result, res) {
  res.json(result);
}

function getAuthorization(authorization) {
  console.log(authorization);
  const [type, value ] = authorization.split(' ');
  return {type, value}
}

router.post('/', async (req, res, next) => {
  // await AuthorizationService.createTestApiKey();
  if (!req.headers.authorization) {
    return res.status(403).send();
  }
  // console.log(req.headers);
  try {
    const authorization = getAuthorization(req.headers.authorization);
    const validations = {
      apikey: AuthorizationService.validateApiKey,
      bearer: AuthorizationService.validateAccessToken
    }

    const type = typeof authorization.type === 'string' ? authorization.type.toLowerCase() : void 0;

    const validation = validations[type];

    if (!validation) {
      return res.status(403).send('Missing authorization');
    }

    const validationResult = await validation(authorization.value);
    if (validationResult.error !== 0) {
      return res.status(403).send(validationResult);
    }
  } catch( err ) {
    console.log(err);
    res.status(403).send({ errors: err });
  }
  try {
    
    // ver si esto esta bien o hay que hacer algun invento.
    const tokenValidationResult = await AuthorizationService.validateAccessToken(req.body.token);
    if (tokenValidationResult.error === 0) {
      res.status(201);
      returnResult(tokenValidationResult.accessToken.body.userId, res);
    } else {
      res.status(401).send();
      returnResult(tokenValidationResult, res);
    }
  } catch (err) {
    console.log(err);
    res.status(403).send({ errors: err });
  }
});

router.get('/:id', async (req, res, next) => {

});

router.patch('/:id', async (req, res, next) => {

})

module.exports = router;
