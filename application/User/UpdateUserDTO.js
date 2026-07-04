function validateUserUpdate(rawData) {
  const { username, name, family, email, password, PhoneNo } = rawData;
  const validData = {};

  if (username !== undefined) {
    if (typeof username !== 'string' || username.trim() === '') {
      return { isValid: false, statusCode: 400, error: "Username cannot be empty." };
    }
    validData.username = username;
  }

  if (name !== undefined) validData.name = name;
  if (family !== undefined) validData.family = family;

  if (email !== undefined) {
    if (typeof email !== 'string' || email.trim() === '') {
      return { isValid: false, statusCode: 400, error: "Email cannot be empty." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, statusCode: 400, error: "Invalid email format." };
    }
    validData.email = email;
  }

  if (password !== undefined) {
    if (typeof password !== 'string' || password.trim() === '') {
      return { isValid: false, statusCode: 400, error: "Password cannot be empty." };
    }
    validData.password = password;
  }

  if (PhoneNo !== undefined) {
    if (typeof PhoneNo !== 'string' || PhoneNo.trim() === '') {
      return { isValid: false, statusCode: 400, error: "PhoneNo cannot be empty." };
    }
    const phoneRegex = /^0[0-9]{10}$/;
    if (!phoneRegex.test(PhoneNo)) {
      return { isValid: false, statusCode: 400, error: "PhoneNo must be exactly 11 digits long, be a string, and start with '0'." };
    }
    validData.PhoneNo = PhoneNo;
  }

  if (Object.keys(validData).length === 0) {
    return { isValid: false, statusCode: 400, error: "No valid fields provided for update." };
  }

  return { isValid: true, data: validData };
}

module.exports = { validateUserUpdate };