const Users = require("../models/Users");

const saveProfilePhoto = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.user }).exec();
    user.profilePhoto = req.body.imgBase64;
    user.save();
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(401).end();
  }
};
const changePassword = () => {};

module.exports = { saveProfilePhoto, changePassword };
