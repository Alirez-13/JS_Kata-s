const express = require('express');
const router = express.Router();

const CreateUser = require('./application/User/CreateUser');
const UpdateUser = require('./application/User/UpdateUser');
// const DeleteUser = require('./application/User/DeleteUser');

// POST /users/register
router.post('/users/register', async (req, res) => {
  const result = await CreateUser.createUser(req.body);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  
  res.status(result.statusCode).json(result.data);
});

// PUT /users/:username (Update User)
router.put('/users/:username', async (req, res) => {
  
  const result = await UpdateUser.updateUserExecute(req.params.username, req.body);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  res.status(result.statusCode).json(result.data);
});

module.exports = router;