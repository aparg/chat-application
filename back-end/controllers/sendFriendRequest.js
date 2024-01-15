const Users = require("../models/Users");
const sendFriendRequest = async (req, res) => {
  try {
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
    io.to().emit("friendRequestSent", requestSender);
  } catch (err) {
    console.error(err);
  }
};

export default sendFriendRequest;
