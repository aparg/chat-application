const Message = require("../models/Messages");
const Users = require("../models/Users");
let friendsResponse = null;
const getFriends = async (req, res) => {
  if (!friendsResponse) {
    friendsResponse = await Users.findOne({ username: req.user }).populate(
      "friends"
    );
  }
  const namePhotoArray = friendsResponse.friends.map((friend) => {
    return { username: friend.username, profilePhoto: friend.profilePhoto };
  });
  res.status(200).json(namePhotoArray);
};

const addFriends = async (req, res) => {
  const response = await Users.find({});
  if (!friendsResponse) {
    friendsResponse = await Users.findOne({ username: req.user }).populate(
      "friends"
    );
  }
  let suggestedFriends = [];
  for (let i = 0; i < response.length; i++) {
    for (let j = 0; j < friendsResponse.friends.length; j++) {
      if (friendsResponse.friends[j].username === response[i].username) {
        break;
      }
      if (j == friendsResponse.friends.length - 1)
        suggestedFriends.push(response[i]);
    }
  }
  const namePhotoArray = suggestedFriends.map((data) => {
    return { username: data.username, profilePhoto: data.profilePhoto };
  });
  res.status(200).json(namePhotoArray);
};
module.exports = { getFriends, addFriends };
