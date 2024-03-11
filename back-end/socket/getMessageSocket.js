const EVENT_NAME = "get message";
const Messages = require("../models/Messages");
const getMessageSocket = (socket) => {
  socket.on(EVENT_NAME, async (data) => {
    console.log("Getting non-spam messages...");
    const { conversationId } = data;
    const messages = await Messages.find({
      conversation: conversationId,
      spam: false,
    })
      .populate("sender", "username")
      .exec();
    socket.emit("message response", messages);
  });
};

module.exports = getMessageSocket;
