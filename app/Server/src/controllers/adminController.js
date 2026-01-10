const User = require("../models/User");
const Appointment = require("../models/Appointment");

const listUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role) {
      user.role = role;
    }
    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }

    await user.save();

    res.json({
      id: user._id,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

const summary = async (_req, res) => {
  try {
    const [patients, doctors, appointments] = await Promise.all([
      User.countDocuments({ role: "patient" }),
      User.countDocuments({ role: "doctor" }),
      Appointment.countDocuments(),
    ]);

    res.json({ patients, doctors, appointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to load summary", error: error.message });
  }
};

module.exports = {
  listUsers,
  updateUserRole,
  summary,
};

