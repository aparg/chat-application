const Users = require("../models/Users");
const accept = async (req, res) => {
  try {
    const io = req.app.get("io");
    const friendReqReceiver = await Users.findOne({
      username: req.user,
    })
      .populate("friendRequestList")
      .select("friends friendRequestList")
      .exec();

    console.log(friendReqReceiver);
    const friendReqSender = await Users.findOne({
      username: req.body.username,
    })
      .populate("friendRequestList")
      .select("friends friendRequestList")
      .exec();
    (!friendReqReceiver || !friendReqSender) && res.status(404);
    //add to the friendlist of the receiver
    if (!friendReqReceiver.friends.includes(friendReqSender._id)) {
      friendReqReceiver.friends.push(friendReqSender._id);
    }
    console.log(friendReqReceiver);
    friendReqReceiver.friendRequestList =
      friendReqReceiver.friendRequestList.filter(
        (val) => val.username !== req.body.username
      );
    await friendReqReceiver.save();

    //add to the friendlist of sender
    if (!friendReqSender.friends.includes(friendReqReceiver._id)) {
      friendReqSender.friends.push(friendReqReceiver._id);
    }
    await friendReqSender.save();
    //referesh friend list once a friend request is accepted
    io.to(`user${friendReqReceiver._id}`).emit("refreshFriendList");
    io.to(`user${friendReqSender._id}`).emit("refreshFriendList");
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
    const friendReqReceiver = await Users.findOne({ username: req.user })
      .populate("friendRequestList")
      .select("friendRequestList");
    !friendReqReceiver && res.status(404);
    friendReqReceiver.friendRequestList =
      friendReqReceiver.friendRequestList.filter(
        (val) => val.username !== req.body.username
      );
    await friendReqReceiver.save();
    res.status(200);
    res.end();
  } catch (err) {
    console.log("Could not decline request");
    console.log(err);
  }
};

module.exports = { accept, decline };
