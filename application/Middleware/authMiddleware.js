const { validateToken } = require('../../application/Token/ValidateToken');

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.substring(7).trim();
  const validationResult = validateToken(token);

  if (!validationResult.isValid) {

    return res.status(401).json({ error: validationResult.error });
  }


  req.user = { 
    username: validationResult.username 
  };


  next();
}

module.exports = requireAuth;