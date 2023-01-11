const express = require('express');
const {log} = require('../lib/logger')
const AuthenticationService = require('./authentication-service');

const router = express.Router();

function handleError(resource, reason, message, code) {
  console.log(`ERROR: ${reason}:${message}`);
  resource.status(code || 500).json({ error: message });
}

function returnResult(result, res) {
  res.json(result);
}

router.post('/', async (req, res, next) => {
  log('Authenticating...')
  try {
    const user = req.body.user;

    if (user.username === undefined) {
      res.status(400);
      const message = 'Missing username parameter'
      log(message)
      returnResult({ errorMsg: message}, res);
      return false;
    }

    if (user.password === undefined) {
      res.status(400);
      const message = 'Missing password parameter'
      log(message)
      returnResult({ errorMsg: message}, res);
      return false;
    }
    const result = await AuthenticationService.login(user);
    if (result.error === 0) {
      res.status(201);

      returnResult(result, res);
    } else {
      res.status(404);
      returnResult(result, res);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: err });
  }
});

module.exports = router;
