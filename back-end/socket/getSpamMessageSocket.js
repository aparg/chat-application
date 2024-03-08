const EVENT_NAME = "get spam message";
const Messages = require("../models/Messages");
const getMessageSocket = (socket) => {
  socket.on(EVENT_NAME, async (data) => {
    const { conversationId } = data;
    console.log("Conversation id" + conversationId);
    const messages = await Messages.find({
      conversation: conversationId,
      spam: true,
    })
      .populate("sender", "username")
      .exec();
    console.log("spam messages");
    console.log(messages);
    socket.emit("message spam response", messages);
  });
};

module.exports = getMessageSocket;
