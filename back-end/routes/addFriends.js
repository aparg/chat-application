const express = require("express");
const router = express.Router();
const sendFriendRequest = require("../controllers/sendFriendRequest");
router.route("/").post(sendFriendRequest);
module.exports = router;
