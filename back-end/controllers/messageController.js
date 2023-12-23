const Message = require("../models/Messages");

const sendMessage = (req, res) => {
  const { conversationId, content } = req.body;
  Message.create({
    conversation: conversationId,
    content: content,
  });
};

module.exports = { sendMessage };
