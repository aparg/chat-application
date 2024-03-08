const Users = require("../models/Users");
const accept = async (req, res) => {
  try {
    const io = req.app.get("io");
    const user = await Users.findOne({ username: req.user }).exec();
    const friendReqSender = await Users.findOne({
      username: req.body.username,
    }).exec();
    (!user || !friendReqSender) && res.status(404);
    if (!user.friends.includes(friendReqSender._id)) {
      user.friends.push(friendReqSender.id);
    }
    user.friendRequestList = user.friendRequestList.filter(
      (val) => val.username !== req.body.username
    );
    await user.save();
    io.to(`user${user._id}`).emit("refreshFriendList");
    res.status(200);
    res.end();
  } catch (err) {
    console.log("Could not accept request");
    console.log(err);
  }
};

const decline = async (req, res) => {
  try {
    const io = req.app.get("io");
    const user = await Users.findOne({ username: req.user }).populate(
      "friendRequestList"
    );
    !user && res.status(404);
    user.friendRequestList = user.friendRequestList.filter(
      (val) => val.username !== req.body.username
    );
    await user.save();
    io.to(`user${user._id}`).emit("refreshFriendList");
    res.status(200);
    res.end();
  } catch (err) {
    console.log("Could not decline request");
    console.log(err);
  }
};

module.exports = { accept, decline };
