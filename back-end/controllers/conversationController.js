const Conversation = require("../models/Conversations");
const Users = require("../models/Users");

const findUserId = async (name) => {
  try {
    const user = await Users.findOne({ username: name }).exec();
    const userId = user?._id;
    return userId;
  } catch (err) {
    console.log("Couldn't retrieve user id");
    throw err;
  }
};

const createConversation = async (senderId, receiverId) => {
  try {
    console.log("Creating..");
    const conversation = await Conversation.create({
      participants: [receiverId, senderId],
    });
    return conversation?._id;
  } catch (err) {
    console.log("Couldn't create conversation");
    throw err;
  }
};

const getConversationId = async (req, res) => {
  const { receiverName } = req.body;
  const { user } = req;
  try {
    console.log("Getting Conversation Id...");
    const senderId = await findUserId(user);
    const receiverId = await findUserId(receiverName);
    console.log(`${user} and ${receiverName}`);
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).exec();
    console.log(conversation);
    //if converssation exists, return its id else create a new conversation and return the conversation's id
    const conversationId = conversation?._id
      ? conversation?._id
      : await createConversation(senderId, receiverId);
    res.json({ conversationId });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getConversationId };
