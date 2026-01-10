const express = require("express");
const router = express.Router();
const { listDoctors, updateProfile } = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router.use(authenticate);

router.get("/doctors", listDoctors);
router.patch("/:id", updateProfile);

module.exports = router;


