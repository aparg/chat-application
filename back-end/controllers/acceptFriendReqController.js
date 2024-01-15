const Users = require("../models/Users");
const sendRequest = async (req, res) => {
  try {
    const { username } = req.body; //sender username
    console.log(username);
    const filter = { username: req.user };
    const requestReceiver = await Users.findOne(filter).exec();
    console.log(requestReceiver);
    const requestSender = await Users.findOne({ username }).exec();
    if (!requestSender) {
      res.sendStatus(404);
      return;
    }
    if (!requestReceiver.friendRequestList.includes(requestSender._id)) {
      requestReceiver.friendRequestList.push(requestSender._id);
      requestReceiver.save();
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sendRequest };
