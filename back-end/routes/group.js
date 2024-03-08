const express = require("express");
const router = express.Router();
const { getGroups, addMember } = require("../controllers/groupController");
router.route("/get").post(getGroups);
router.route("/addMember").post(addMember);
module.exports = router;
