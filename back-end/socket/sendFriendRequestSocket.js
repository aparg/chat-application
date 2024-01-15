const EVENT_NAME = "sendFriendRequest";
const Messages = require("../models/Messages");
const Users = require("../models/Users");
const sendFriendRequestSocket = (socket, io) => {
  socket.on(EVENT_NAME, async ({ receiverName }) => {
    try {
      const filter = { username: req.user };
      const requestReceiver = await Users.findOne({
        username: receiverName,
      }).exec();
      const requestSender = await Users.findOne(filter).exec();
      if (!requestReceiver.friendRequestList.includes(requestSender._id)) {
        requestReceiver.friendRequestList.push(requestSender._id);
        requestReceiver.save();
      }
    } catch (err) {
      console.error(err);
    }
  });
};

export default sendFriendRequestSocket;
