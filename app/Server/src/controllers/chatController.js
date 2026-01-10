const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  const { receiverId, content, appointmentId } = req.body;

  if (!receiverId || !content) {
    return res.status(400).json({ message: "Receiver and content required" });
  }

  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
      appointment: appointmentId,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

const getConversation = async (req, res) => {
  const { withUser } = req.query;
  if (!withUser) {
    return res.status(400).json({ message: "withUser query param missing" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: withUser },
        { sender: withUser, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to load messages", error: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
};


