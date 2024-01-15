const express = require("express");
const router = express.Router();
const { showFriendReq } = require("../controllers/showFriendReqController");

router.route("/").post(showFriendReq);

module.exports = router;
