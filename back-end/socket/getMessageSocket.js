const EVENT_NAME = "get message";
const Messages = require("../models/Messages");
const getMessageSocket = (socket) => {
  socket.on(EVENT_NAME, async (data) => {
    console.log("Getting non-span messages...");
    const { conversationId } = data;
    console.log(conversationId);
    const messages = await Messages.find({
      conversation: conversationId,
      spam: false,
    })
      .populate("sender", "username")
      .exec();
    console.log(messages);
    socket.emit("message response", messages);
  });
};

module.exports = getMessageSocket;
