const ValidateToken = require('../../application/Token/ValidateToken');

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  //Format "Bearer <token>"
  const token = authHeader.split(' ')[1];

  const validationResult = ValidateToken.validateToken(token);

  if (!validationResult.isValid) {
    return res.status(403).json({ error: validationResult.error });
  }

  req.user = { 
    username: validationResult.username 
  };

  //All routes after this middleware are auth required. 
  next();
}

module.exports = requireAuth;