const express = require("express");
const router = express.Router();
const {
  saveProfilePhoto,
  changePassword,
} = require("../controllers/editProfileController");

router.route("/saveProfilePhoto").post(saveProfilePhoto);
router.route("/changePassword").post(changePassword);
module.exports = router;
