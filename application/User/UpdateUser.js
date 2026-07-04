const { User } = require('../../models/User');
const UpdateUserDTO = require('./UpdateUserDTO');

async function executeUpdateUser(targetUsername, rawData) {
  try {
    const dtoResult = UpdateUserDTO.validateUserUpdate(rawData);
    if (!dtoResult.isValid) {
      return { success: false, statusCode: dtoResult.statusCode, error: dtoResult.error };
    }

    const user = await User.findOne({ where: { username: targetUsername } });
    
    if (!user) {
      return { success: false, statusCode: 404, error: `User with username '${targetUsername}' not found.` };
    }

    await user.update(dtoResult.data);
    
    return { success: true, statusCode: 200, data: user };

  } catch (error) {
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return { success: false, statusCode: 409, error: error.errors[0].message };
    }

    console.error("Database error during user update:", error);
    return { success: false, statusCode: 500, error: "An internal server error occurred." };
  }
}

module.exports = { executeUpdateUser };