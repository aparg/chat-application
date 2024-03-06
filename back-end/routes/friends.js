const express = require("express");
const router = express.Router();
const { getFriends, addFriends } = require("../controllers/friendsController");
router.route("/get").post(getFriends);
router.route("/add").post(addFriends);

module.exports = router;
