const { User } = require('../../models/User');

async function executeGetAllUser() {
  try {
    
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    return { success: true, statusCode: 200, data: users };
  } catch (error) {
    console.error("Database error during fetching users:", error);
    return { success: false, statusCode: 500, error: "An internal server error occurred." };
  }
}

module.exports = { executeGetAllUser };