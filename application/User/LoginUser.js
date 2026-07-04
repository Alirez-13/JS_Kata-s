const { User } = require('../../models/User');
const TokenCreation = require('../../application/Token/CreateToken'); 

async function executeLogin(loginData) {
  try {
    const { username, password } = loginData;

    if (!username || !password) {
      return { success: false, statusCode: 400, error: "Username and password are required." };
    }

    const user = await User.findOne({ where: { username } });
    
    if (!user || user.password !== password) {
      return { success: false, statusCode: 401, error: "Invalid username or password." };
    }

    
    const token = TokenCreation.generateToken(user.username);

    return { 
      success: true, 
      statusCode: 200, 
      data: { 
        message: "Login successful",
        token: token, 
        username: user.username 
      } 
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, statusCode: 500, error: "Internal server error." };
  }
}

module.exports = { executeLogin };