const Message = require("../models/Messages");
const Users = require("../models/Users");
const getFriends = async (req, res) => {
  const friendsResponse = await Users.findOne({
    username: req.user,
  }).populate("friends");

  console.log("Friends Response");
  const namePhotoArray = friendsResponse.friends.map((friend) => {
    return { username: friend.username, profilePhoto: friend.profilePhoto };
  });
  res.status(200).json(namePhotoArray);
};

const addFriends = async (req, res) => {
  const friendsResponse = await Users.findOne({ username: req.user });
  const response = await Users.find({}).exec();
  console.log("User requested" + req.user);
  console.log(friendsResponse.friends.length);
  let suggestedFriends = [];
  for (let i = 0; i < response.length; i++) {
    if (friendsResponse.friends.length == 0) {
      suggestedFriends = [...response];
    } else {
      for (let j = 0; j < friendsResponse.friends.length; j++) {
        if (
          friendsResponse.friends[j].username !== response[i].username &&
          !suggestedFriends.includes(response[i])
        ) {
          suggestedFriends.push(response[i]);
        }
      }
    }
  }
  console.log("suggested friends");
  const namePhotoArray = suggestedFriends.map((data) => {
    return { username: data.username, profilePhoto: data.profilePhoto };
  });
  res.status(200).json(namePhotoArray);
};
module.exports = { getFriends, addFriends };
