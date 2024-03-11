const Conversations = require("../models/Conversations");
const Users = require("../models/Users");

const getGroups = async (req, res) => {
  const user = await Users.findOne({ username: req.user }).select("_id").exec();
  const groups = await Conversations.find({
    participants: { $elemMatch: { $eq: user._id } },
    group: true,
  });
  res.json(groups);
};

const addMember = async (req, res) => {
  const addedMember = await Users.findOne({ username: req.body.username })
    .select("_id")
    .exec();
  const addedConversation = await Conversations.findOne({
    name: req.body.groupName,
  })
    .select("participants")
    .exec();
  !addedConversation.participants.includes(addedMember) &&
    addedConversation?.participants.push(addedMember);
  await addedConversation.save();
  res.status(200);
};

module.exports = { getGroups, addMember };
