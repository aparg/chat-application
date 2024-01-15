const Users = require("../models/Users");

const showFriendReq = async (req, res) => {
  const data = await Users.findOne({ username: req.user })
    .populate("friendRequestList")
    .exec();
  console.log(data.friendRequestList);
  res.json(data?.friendRequestList);
};

module.exports = { showFriendReq };
