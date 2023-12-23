const Conversation = require("../models/Conversations");
const Users = require("../models/Users");

const findUserId = async (name) => {
  try {
    const user = await Users.findOne({ username: name }).exec();
  } catch (err) {
    console.log("Couldn't retrieve user id");
    throw err;
  }
  const userId = user?._id;
  return userId;
};

const createConversation = async (senderId, receiverId) => {
  try {
    console.log("Creating..");
    const conversation = await Conversation.create({
      participants: [receiverId, senderId],
    }).exec();
    return conversation?._id;
  } catch (err) {
    console.log("Couldn't create conversation");
    throw err;
  }
};

const getConversationId = async (req, res) => {
  const { receiverName } = req.body;
  const { name } = req;
  try {
    console.log("Getting Conversation Id...");
    const senderId = await findUserId(name);
    const receiverId = await findUserId(receiverName);
    const conversation = await Conversation.findOne({
      participants: [receiverId, senderId],
    }).exec();

    //if converssation exists, return its id else create a new conversation and return the conversation's id
    return conversation?._id
      ? conversation._id
      : await createConversation(senderId, receiverId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getConversationId };
