const mongoose = require("mongoose");

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    reason: String,
    status: {
      type: String,
      enum: statusOptions,
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
module.exports.statusOptions = statusOptions;

