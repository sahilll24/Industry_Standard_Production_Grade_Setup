const express = require("express");
const router = express.Router();
const {
  listUsers,
  updateUserRole,
  summary,
} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

router.use(authenticate, authorize("admin"));

router.get("/users", listUsers);
router.patch("/users/:id", updateUserRole);
router.get("/summary", summary);

module.exports = router;


