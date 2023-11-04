const jsonwebtoken = require("jsonwebtoken");

const messages = require("./../messages");
const {
    unauthorizedMessage,
    authenticationErrorMessage,
  } = messages;

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: unauthorizedMessage });
  }

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: authenticationErrorMessage });
  }
};

module.exports = authenticateUser;
