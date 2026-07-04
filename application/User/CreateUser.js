const { User } = require('../../models/User')
const CreateUserDTO = require('./CreateUserDTO')
const crypto = require('crypto')

async function createUser(rawData) {
  try {
    
    const dtoResult = CreateUserDTO.validateCreateUser(rawData)
    
    if (!dtoResult.isValid) {
      return {
        success: false,
        statusCode: dtoResult.statusCode,
        error: dtoResult.error
      }
    }
    
    const userId = crypto.randomUUID()

    
    const validUserData = dtoResult.data
    const newUserData = {
      ...validUserData,
      id: userId
    }

    const newUser = await User.create(newUserData)
    
    return { success: true, statusCode: 201, data: newUser }

  } catch (error) {
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return { 
        success: false, 
        statusCode: 409, 
        error: error.errors[0].message 
      }
    }

    console.error("Database error during user creation:", error);
    return { 
      success: false, 
      statusCode: 500, 
      error: "An internal server error occurred." 
    };
  }
}

module.exports = { createUser };