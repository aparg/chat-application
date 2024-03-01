const Message = require("../models/Messages");
const Users = require("../models/Users");
const getFriends = async (req, res) => {
  const response = await Users.findOne({ username: req.user }).populate(
    "friends"
  );
  const namesArray = response.friends.map((friend) => {
    return friend.username;
  });
  console.log(namesArray);
  res.status(200).json(namesArray);
};

module.exports = { getFriends };
