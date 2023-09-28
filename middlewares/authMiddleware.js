const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const requireAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

module.exports = { requireAuth };
