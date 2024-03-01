const express = require("express");
const router = express.Router();
const { getFriends } = require("../controllers/friendsController");
router.route("/get").post(getFriends);

module.exports = router;
