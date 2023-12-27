const EVENT_NAME = "get message";
const Messages = require("../models/Messages");
const getMessageSocket = (socket, io) => {
  socket.on(EVENT_NAME, async (data) => {
    const { conversationId } = data;
    const messages = await Messages.find({
      conversation: conversationId,
    })
      .populate("sender", "username")
      .exec();
    console.log("messages" + messages);
    socket.emit("message response", messages);
  });
};

module.exports = getMessageSocket;
