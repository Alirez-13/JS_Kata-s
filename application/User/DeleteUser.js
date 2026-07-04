const { User } = require('../../models/User');

async function executeDeleteUser(targetUsername) {
  try {
    // 1. Find the user by username
    const user = await User.findOne({ where: { username: targetUsername } });
    
    // 2. If user doesn't exist, return 404 Not Found
    if (!user) {
      return { success: false, statusCode: 404, error: `User with username '${targetUsername}' not found.` };
    }

    // 3. Delete the user
    await user.destroy();
    
    return { success: true, statusCode: 200, message: `User '${targetUsername}' deleted successfully.` };

  } catch (error) {
    console.error("Database error during user deletion:", error);
    return { success: false, statusCode: 500, error: "An internal server error occurred." };
  }
}

module.exports = { executeDeleteUser };