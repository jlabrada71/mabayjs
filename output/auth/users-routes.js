const express = require('express');
const { ObjectId } = require('mongodb');
const UserService = require('./user-service');
const UserRepository = require('./user-repository');

const router = express.Router();

function handleError(resource, reason, message, code) {
  console.log(`ERROR: ${reason}:${message}`);
  resource.status(code || 500).json({ error: message });
}

function returnResult(result, res) {
  res.json(result);
}

function getPaging(query) {
  if (!query) {
    return { limit: 10, page: 0 };
  }
  const limit = query.limit && query.limit <= 100 ? parseInt(query.limit, 10) : 10;
  const page = query.page && Number.isInteger(query.page) ? parseInt(query.page, 10) : 0;
  return { limit, page };
}

router.get('/', async (req, res) => {
  const userRepository = new UserRepository();
  const paging = getPaging(req.query);

  try {
    const result = await userRepository.select({}, paging);
    // console.log(result);
    res.status(200);
    returnResult(result, res);
  } catch (e) {
    console.log(e.stack)
    returnResult('ocurrio error', res);
  }
});

async function isPasswordAndUserMatch(req, res, next) {
  const result = await UserService.updatePassword(req.body.user);
  if (result.error !== 0) {
    res.status(404).send({});
    return result;
  }

  /* eslint no-param-reassign: "error" */
  req.body.user = result;
  return next();
}

router.get('/:id', async (req, res, next) => {
  const userRepository = new UserRepository();
  try {
    const record = { _id: ObjectId(req.params.id) };
    const result = await userRepository.select(record);
    returnResult(result, res);
  } catch (e) {
    console.log(e.stack)
    returnResult('ocurrio error', res);
  }
});

router.put('/:id', async (req, res, next) => {
  const userRepository = new UserRepository();
  try {
    const record = { _id: ObjectId(req.params.id) };
    const { user } = req.body;
    if ('_id' in user) {
      delete user._id;
    }
    // console.log('actualizando:');
    // console.log(record);
    // console.log('con los datos');
    // console.log(user);
    const result = await userRepository.update(record, { $set: user });
    returnResult(result, res);
  } catch (e) {
    console.log(e.stack)
    returnResult('ocurrio error', res);
  }
});

router.patch('/:id', async (req, res, next) => {
  // console.log('adicionando');
  // console.log(req.body.user);
  try {
    const result = await UserService.updatePassword(req.body.user);
    // console.log(result);
    res.status(204);
    returnResult({ error: result.error, errorMsg: result.errorMsg }, res);
  } catch (e) {
    console.log(e.stack)
    res.status(400); // map error code to http code
    returnResult('ocurrio error', res);
  }
})

router.delete('/:id', async (req, res, next) => {
  const userRepository = new UserRepository();
  try {
    const record = { _id: ObjectId(req.params.id) };
    // console.log('borrando');
    // console.log(record);
    const result = await userRepository.deleteRecord(record);
    res.status(204);
    returnResult(result, res);
  } catch (e) {
    console.log(e.stack);
    res.status(500); // map error code to http code
    returnResult('ocurrio error', res);
  }
});

router.post('/', async (req, res, next) => {
  // console.log('adicionando');
  // console.log(req.body.user);
  try {
    const result = await UserService.register(req.body.user);
    // console.log(result);
    res.status(201);
    returnResult({ id: result.insertedId }, res);
  } catch (e) {
    console.log(e.stack)
    res.status(400);
    returnResult('ocurrio error', res);
  }
});

module.exports = router;
