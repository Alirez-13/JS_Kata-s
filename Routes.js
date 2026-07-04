const express = require('express');
const router = express.Router();

const CreateUser = require('./application/User/CreateUser');
const UpdateUser = require('./application/User/UpdateUser');
const DeleteUser = require('./application/User/DeleteUser')

// POST /users/register
router.post('/users/register', async (req, res) => {
  const result = await CreateUser.ExecuteCreateUser(req.body);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  
  res.status(result.statusCode).json(result.data);
});

// PUT /users/:username (Update User)
router.put('/users/:username', async (req, res) => {
  
  const result = await UpdateUser.executeUpdateUser(req.params.username, req.body);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  res.status(result.statusCode).json(result.data);
});

// DELETE /users/:username (Delete User)
router.delete('/users/:username', async (req, res) => {
  
  const result = await DeleteUser.executeDeleteUser(req.params.username);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  res.status(result.statusCode).json({ message: result.message });
});
module.exports = router;