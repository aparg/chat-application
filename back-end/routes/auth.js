const express = require("express");
const router = express.Router();
const { checkUser } = require("../controllers/authController");
router.route("/").post(checkUser);

module.exports = router;
