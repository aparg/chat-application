const express = require("express");
const router = express.Router();
const { userLogout } = require("../controllers/logoutController");
router.route("/").post(userLogout);

module.exports = router;
