const express = require("express");
const router = express.Router();
const { allUsers } = require("../controllers/allUsersController");
router.route("/").post(allUsers);

module.exports = router;
