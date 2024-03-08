const EVENT_NAME = "chat message";
const Messages = require("../models/Messages");
const Users = require("../models/Users");
const { spawn } = require("child_process");
const path = require("path");
const messageSocket = (socket, io) => {
  socket.on(EVENT_NAME, async (data) => {
    const { conversationId, content, sender } = data;
    const scriptPath = path.join(__dirname, "../spamFilter/spamFilter.py");
    const cwd = path.join(__dirname, "../spamFilter");
    const python = spawn("python3", [scriptPath, content], { cwd: cwd });
    python.stdout.on("data", async (spam) => {
      console.log(typeof spam.toString());
      console.log(typeof "False");
      console.log(spam.toString().includes("False"));
      const senderId = await Users.findOne({ username: sender }).exec();
      await Messages.create({
        conversation: conversationId,
        content: content,
        sender: senderId,
        spam: spam.toString().includes("False") ? false : true,
      });
      const messages = await Messages.find({
        conversation: conversationId,
        spam: false,
      })
        .populate("sender", "username")
        .exec();
      //emit changes to all participants in the room with same conversation id
      if (messages.spam) {
        io.to(`user${senderId}`).emit("message response", messages);
      } else {
        io.to(conversationId).emit("message response", messages);
      }
    });
    python.stderr.on("data", (data) => {
      console.error(`Error from Python Script: ${data}`);
    });
    python.on("close", (code) => {
      console.log(`Python Script exited with code ${code}`);
    });
  });
};

module.exports = messageSocket;
