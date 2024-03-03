const Users = require("../models/Users");

const showFriendReq = async (req, res) => {
  const data = await Users.findOne({ username: req.user })
    .populate("friendRequestList", "username")
    .exec();
  console.log("yo");
  const response = data?.friendRequestList.map((data) => data.username);
  console.log(response);
  res.json(response);
};

module.exports = { showFriendReq };
