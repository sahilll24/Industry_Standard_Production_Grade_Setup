const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {
  try {
    const { doctorId, scheduledAt, reason } = req.body;
    if (!doctorId || !scheduledAt) {
      return res.status(400).json({ message: "Missing appointment fields" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      scheduledAt,
      reason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment", error: error.message });
  }
};

const listAppointments = async (req, res) => {
  try {
    const filter = {};

    if (req.user.role === "patient") {
      filter.patient = req.user._id;
    } else if (req.user.role === "doctor") {
      filter.doctor = req.user._id;
    }

    const appointments = await Appointment.find(filter)
      .populate("patient", "fullName email")
      .populate("doctor", "fullName email specialization")
      .sort({ scheduledAt: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (req.user.role === "patient" && appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to update this appointment" });
    }

    if (status) {
      if (!Appointment.statusOptions.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      appointment.status = status;
    }
    if (notes) appointment.notes = notes;

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment", error: error.message });
  }
};

module.exports = {
  createAppointment,
  listAppointments,
  updateAppointmentStatus,
};

