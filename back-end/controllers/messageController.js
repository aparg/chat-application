const Message = require("../models/Messages");

const displayMessage = (req, res) => {
  Message.create({
    conversation: conversationId,
    content: content,
  });
};

module.exports = { displayMessage };
