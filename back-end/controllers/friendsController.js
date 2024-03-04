const Message = require("../models/Messages");
const Users = require("../models/Users");
const getFriends = async (req, res) => {
  const response = await Users.findOne({ username: req.user }).populate(
    "friends"
  );
  const namePhotoArray = response.friends.map((friend) => {
    return friend.username;
  });
  res.status(200).json(namePhotoArray);
};

module.exports = { getFriends };
