const express = require("express");
const router = express.Router();
const { sendMessage, getConversation } = require("../controllers/chatController");
const { authenticate } = require("../middleware/auth");

router.use(authenticate);

router.get("/", getConversation);
router.post("/", sendMessage);

module.exports = router;


