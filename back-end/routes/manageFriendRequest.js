const express = require("express");
const router = express.Router();
const { accept, decline } = require("../controllers/manageFriendReqController");
router.route("/accept").post(accept);
router.route("/decline").post(decline);
module.exports = router;
