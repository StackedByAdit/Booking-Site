const jwt = require('jsonwebtoken');
const secretKey = "thismustbethesecretkey123";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authorization header missing"
    });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = {
      userId: payload.userId,
      username: payload.username
    };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Token invalid"
    });
  }
};

module.exports = {
  authMiddleware,
  secretKey,
  jwt
};
