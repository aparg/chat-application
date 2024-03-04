const Users = require("../models/Users");

const showFriendReq = async (req, res) => {
  const data = await Users.findOne({ username: req.user })
    .populate("friendRequestList")
    .exec();
  console.log("yo");
  const response = data?.friendRequestList.map((data) => {
    return { username: data.username, profilePhoto: data.profilePhoto };
  });
  res.json(response);
};

module.exports = { showFriendReq };
