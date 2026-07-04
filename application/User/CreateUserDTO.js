function validateCreateUser(rawData) {
  const { username, name, family, email, password, PhoneNo } = rawData;

  if (!username || !name || !family || !email || !password || !PhoneNo) {
    return {
      isValid: false,
      statusCode: 400,
      error: "All fields (username, name, family, email, password, PhoneNo) are required."
    };
  }

  const phoneRegex = /^0[0-9]{10}$/;
  if (typeof PhoneNo !== 'string' || !phoneRegex.test(PhoneNo)) {
    return {
      isValid: false,
      statusCode: 400,
      error: "PhoneNo must be exactly 11 digits long, be a string, and start with '0'."
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      statusCode: 400,
      error: "Invalid email format."
    };
  }

  return {
    isValid: true,
    data: { username, name, family, email, password, PhoneNo }
  };
}

module.exports = { validateCreateUser };