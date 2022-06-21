const jwt = require('jsonwebtoken');

const secret = "B!Nd$.C0"

const generateToken = (email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256'
  }
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
}

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { email } = jwt.verify(authorization, secret);
    req.email = email;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateToken,
  validateToken
}