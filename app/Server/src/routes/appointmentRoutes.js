const express = require("express");
const router = express.Router();
const {
  createAppointment,
  listAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");
const { authenticate, authorize } = require("../middleware/auth");

router.use(authenticate);

router.get("/", listAppointments);
router.post("/", authorize("patient"), createAppointment);
router.patch("/:id", authorize("doctor", "admin", "patient"), updateAppointmentStatus);

module.exports = router;


