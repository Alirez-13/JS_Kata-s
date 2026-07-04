const express = require('express')
const router = express.Router()

const CreateUser = require('./application/User/CreateUser')
const UpdateUser = require('./application/User/UpdateUser')
const DeleteUser = require('./application/User/DeleteUser')
const GetAllUsers = require('./application/User/GetUserList')
const LoginUser = require('./application/User/LoginUser');
// Auth Middleware 
const requireAuth = require('./application/Middleware/authMiddleware');



//-------------- PUBLIC ROUTES

// POST /users/register
router.post('/users/register', async (req, res) => {
  const result = await CreateUser.executeCreateUser(req.body);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  
  res.status(result.statusCode).json(result.data);
});

// POST /users/login
router.post('/users/login', async (req, res) => {
  const result = await LoginUser.executeLogin(req.body);
  if (!result.success) return res.status(result.statusCode).json({ error: result.error });
  res.status(result.statusCode).json(result.data);
});




//-------------- PRIVATE ROUTES
router.use(requireAuth);


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


// GET /users (List all users)
router.get('/users', async (req, res) => {
  const result = await GetAllUsers.executeGetAllUser();
  if (!result.success) return res.status(result.statusCode).json({ error: result.error });
  res.status(result.statusCode).json(result.data);
});

module.exports = router;