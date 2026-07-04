const crypto = require('crypto')

function validateToken(token) {
  try {

    const parts = token.split('.');
    if (parts.length !== 2) {
      return { isValid: false, error: "Malformed token format." };
    }
    
    const [encodedPayload, providedSignature] = parts;
    

    const hmac = crypto.createHmac('sha256', HMAC_SECRET);
    hmac.update(encodedPayload);
    const expectedSignature = hmac.digest('base64url');
    
    const providedBuffer = Buffer.from(providedSignature);
    const expectedBuffer = Buffer.from(expectedSignature);
    
    if (providedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return { isValid: false, error: "Invalid token signature. Data may have been tampered with." };
    }
    
    
    const decodedPayloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const parsedPayload = JSON.parse(decodedPayloadStr);
    
    
    if (Date.now() > parsedPayload.expiresAt) {
      return { isValid: false, error: "Token has expired do the Login again." };
    }
    
    
    return { isValid: true, username: parsedPayload.username };
    
  } catch (error) {
    return { isValid: false, error: "Failed to parse token." };
  }
}
module.exports = {validateToken}