const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;

const checkUser = async (req, res) => {
  const { name, pwd } = req.body;
  if (!name || !pwd) {
    res.status(401).json({ message: "Username and password is needed" });
  }
  const userFound = usersDB.users.find((user) => user.username === name);
  if (!userFound)
    return res.status(401).json({ message: "User doesn't exist" });
  const comparision = await bcrypt.compare(pwd, userFound.password);
  if (comparision) {
    const accessToken = jwt.sign(
      { username: userFound.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360s" }
    );
    const refreshToken = jwt.sign(
      { username: userFound.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // save a refresh token for user who has got the access token so that they can use the refresh token to gain new access token after current access token has expired
    const otherUsers = usersDB.users.filter((user) => user.username !== name);
    const currentUser = { ...userFound, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
    // return res.status(200).json({ message: "Valid username and password" });
  }
  return res.status(201).json({ message: "Password doesn't match" });
};

module.exports = { checkUser };
