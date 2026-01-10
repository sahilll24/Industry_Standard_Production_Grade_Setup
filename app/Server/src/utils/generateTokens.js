const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    }
  );

const generateRefreshToken = (user) =>
  jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};


