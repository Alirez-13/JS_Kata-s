const crypto = require('crypto');

const HMAC_SECRET = 'my-secret-key'; 

function generateToken(username) {

  const payload = {
    username: username,
    salt: crypto.randomBytes(3).toString('hex').substring(0, 5),
    expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes token expire time. 
  };
  
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  

  const hmac = crypto.createHmac('sha256', HMAC_SECRET);
  hmac.update(encodedPayload);
  const signature = hmac.digest('base64url');
  

  return `${encodedPayload}.${signature}`;
}


module.exports = { generateToken};