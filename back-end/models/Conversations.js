const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationsSchema = new Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
  group: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Conversation", conversationsSchema);
