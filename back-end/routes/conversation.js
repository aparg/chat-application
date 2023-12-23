const express = require("express");
const router = express.Router();
const { getConversationId } = require("../controllers/conversationController");
router.route("/").post(getConversationId);
module.exports = router;
