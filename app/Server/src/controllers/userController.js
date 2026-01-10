const User = require("../models/User");

const listDoctors = async (_req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", isActive: true }).select(
      "fullName specialization email _id"
    );
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("✅ Update profile route HIT:", { 
      id, 
      method: req.method, 
      url: req.originalUrl,
      path: req.path,
      body: req.body,
      user: req.user?._id 
    });
    
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { fullName, specialization, phone } = req.body;

    // Users can only update their own profile, or admin can update any
    const userId = req.user._id.toString();
    const requestedId = id.toString();
    
    if (req.user.role !== "admin" && userId !== requestedId) {
      return res.status(403).json({ message: "Not allowed to update this profile" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User not found with ID: ${id}` });
    }

    if (fullName !== undefined && fullName !== null) user.fullName = fullName;
    if (specialization !== undefined && specialization !== null) user.specialization = specialization;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.json({
      id: user._id.toString(),
      _id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      specialization: user.specialization,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

module.exports = { listDoctors, updateProfile };


