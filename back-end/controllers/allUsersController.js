const Message = require("../models/Messages");
const Users = require("../models/Users");
const allUsers = async (req, res) => {
  const { senderName } = req.body;
  const response = await Users.find({ username: { $ne: senderName } });
  const namesArray = response.map((data) => {
    return data.username;
  });
  res.json(namesArray);
};

module.exports = { allUsers };
