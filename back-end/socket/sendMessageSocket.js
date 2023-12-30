const EVENT_NAME = "chat message";
const Messages = require("../models/Messages");
const Users = require("../models/Users");
const messageSocket = (socket, io) => {
  socket.on(EVENT_NAME, async (data) => {
    const { conversationId, content, sender } = data;
    const senderId = await Users.findOne({ username: sender }).exec();
    await Messages.create({
      conversation: conversationId,
      content: content,
      sender: senderId,
    });
    const messages = await Messages.find({
      conversation: conversationId,
    })
      .populate("sender", "username")
      .exec();
    //emit changes to all participants in the room with same conversation id
    io.to(conversationId).emit("message response", messages);
  });
};

module.exports = messageSocket;
