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

const createConversation = async (
  participantsArray,
  group,
  receiverName = null
) => {
  try {
    console.log("Creating..");
    console.log({
      participants: participantsArray,
      group,
      name: receiverName,
    });
    const conversation = await Conversation.create({
      participants: participantsArray,
      group,
      name: receiverName,
    });
    return conversation?._id;
  } catch (err) {
    console.log("Couldn't create conversation");
    throw err;
  }
};

const getConversationId = async (req, res) => {
  const { receiverName, group } = req.body;
  const { user } = req;
  try {
    console.log("Getting Conversation Id...");
    const senderId = await findUserId(user);
    if (!group) {
      const receiverId = await findUserId(receiverName);
      // console.log(receiverId, senderId);
      const conversation = await Conversation.findOne({
        participants: { $all: [receiverId, senderId] },
      }).exec();
      //if converssation exists, return its id else create a new conversation and return the conversation's id
      const conversationId = conversation?._id
        ? conversation?._id
        : await createConversation([senderId, receiverId], group);
      console.log(conversationId);
      res.json({ conversationId });
    } else {
      console.log("Creating group");
      const conversation = await Conversation.findOne({
        group: true,
        name: receiverName,
      }).exec();
      const conversationId =
        conversation?.id ||
        (await createConversation([senderId], group, receiverName));
      console.log(conversationId);
      res.json({ conversationId });
    }
  } catch (err) {
    console.log("Error while getting conversation id");
  }
};

module.exports = { getConversationId };
