const express = require("express");
const router = express.Router();
const { handlleRefreshToken } = require("../controllers/refreshController");
router.route("/").post(handlleRefreshToken);

module.exports = router;
