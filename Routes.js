const express = require('express');
const router = express.Router();
const CreateUser = require('./application/User/CreateUser');

// POST /register
router.post('/register', async (req, res) => {
  const result = await CreateUser.createUser(req.body);
  
  if (!result.success) {
    return res.status(result.statusCode).json({ error: result.error });
  }
  
  res.status(result.statusCode).json(result.data);
});

module.exports = router;