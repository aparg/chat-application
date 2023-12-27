// const usersDB = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const fsPromises = require("fs").promises;
// const path = require("path");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const checkUser = async (req, res) => {
  const { name, pwd } = req.body;
  if (!name || !pwd) {
    return res.status(401).json({ message: "Username and password is needed" });
  }
  // const userFound = usersDB.users.find((user) => user.username === name); //check username
  const userFound = await Users.findOne({ username: name }).exec();
  if (!userFound)
    return res.status(401).json({ message: "User doesn't exist" });
  const comparision = await bcrypt.compare(pwd, userFound.password); //check password
  if (comparision) {
    const roleValues = Object.values(userFound.roles).filter(Boolean); //the value for role(eg. 100 for user)
    const accessToken = jwt.sign(
      {
        userInfo: {
          roles: roleValues,
          username: userFound.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360s" }
    );
    const refreshToken = jwt.sign(
      { username: userFound.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // save a refresh token for user who has got the access token so that they can use the refresh token to gain new access token after current access token has expired

    const filter = { username: name };
    const update = { refreshToken: refreshToken };
    await Users.findOneAndUpdate(filter, update).exec();
    /* For file-based databse*/
    // const otherUsers = usersDB.users.filter((user) => user.username !== name);
    // const currentUser = { ...userFound, refreshToken };
    // usersDB.setUsers([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "models", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken, roles: roleValues });
    // return res.status(200).json({ message: "Valid username and password" });
  }
  return res.status(201).json({ message: "Password doesn't match" });
};

module.exports = { checkUser };
