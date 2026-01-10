const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const register = async (req, res) => {
  try {
    const { fullName, email, password, role: requestedRole = "patient", phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let role = User.roles.includes(requestedRole) ? requestedRole : "patient";
    if (role === "admin") {
      role = "patient";
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      phone,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      user: {
        id: user._id.toString(),
        _id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        specialization: user.specialization,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      user: {
        id: user._id.toString(),
        _id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        specialization: user.specialization,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ message: "Refresh failed", error: error.message });
  }
};

const getProfile = (req, res) => {
  res.json({
    user: {
      id: req.user._id.toString(),
      _id: req.user._id.toString(),
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      phone: req.user.phone,
      specialization: req.user.specialization,
    },
  });
};

module.exports = {
  register,
  login,
  refreshToken,
  getProfile,
};

