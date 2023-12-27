const express = require("express");
const router = express.Router();
const { displayMessage } = require("../controllers/messageController");
router.route("/").post(displayMessage);
module.exports = router;
