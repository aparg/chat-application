const Users = require("../models/Users");
const sendFriendRequest = async (req, res) => {
  try {
    const io = req.app.get("io");
    const filter = { username: req.user };
    const { receiverName } = req.body;
    const requestReceiver = await Users.findOne({
      username: receiverName,
    }).exec();
    const requestSender = await Users.findOne(filter).exec();
    if (!requestReceiver.friendRequestList.includes(requestSender._id)) {
      requestReceiver.friendRequestList.push(requestSender._id);
      requestReceiver.save();
    }
    io.to(`user${requestReceiver._id}`).emit("friendRequest", requestSender);
    res.status(200).end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendFriendRequest;
