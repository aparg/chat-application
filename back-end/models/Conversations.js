const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationsSchema = new Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
  messages: {},
});

module.exports = mongoose.model("Conversation", conversationsSchema);
