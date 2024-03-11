const Message = require("../models/Messages");
const Users = require("../models/Users");
const getFriends = async (req, res) => {
  const friendsResponse = await Users.findOne({
    username: req.user,
  })
    .select("friends")
    .populate("friends");

  console.log("Friends Response");
  const namePhotoArray = friendsResponse.friends.map((friend) => {
    return { username: friend.username, profilePhoto: friend.profilePhoto };
  });
  res.status(200).json(namePhotoArray);
};

const addFriends = async (req, res) => {
  const friendsResponse = await Users.findOne({ username: req.user })
    .select("friends")
    .populate("friends")
    .exec();
  const allUsers = await Users.find({}).exec();
  let suggestedFriends = [];
  if (friendsResponse.friends.length == 0) {
    suggestedFriends = allUsers.filter((data) => data.username !== req.user);
  } else {
    for (let i = 0; i < allUsers.length; i++) {
      for (let j = 0; j < friendsResponse.friends.length; j++) {
        console.log(friendsResponse.friends[j].username + allUsers[i].username);
        if (
          friendsResponse.friends[j].username === allUsers[i].username ||
          suggestedFriends.includes(allUsers[i]) ||
          allUsers[i].username === req.user
        ) {
          console.log(
            friendsResponse.friends[j].username === allUsers[i].username
          );
          console.log(suggestedFriends.includes(allUsers[i]));
          console.log(allUsers[i].username === req.user);
          console.log("not satisfied");
          break;
        }
        console.log(j + friendsResponse.friends.length);
        if (j == friendsResponse.friends.length - 1) {
          console.log(
            friendsResponse.friends[j].username + allUsers[i].username
          );
          suggestedFriends.push(allUsers[i]);
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
