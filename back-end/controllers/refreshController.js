// const usersDB = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const handlleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  //check if received user token is valid for any user or not
  const refreshToken = cookies.jwt;
  const userFound = await Users.findOne({ refreshToken: refreshToken }).exec();
  // const userFound = usersDB.users.find(
  //   (user) => user.refreshToken === refreshToken
  // );
  if (!userFound) return res.sendStatus(403);
  //verify whether refresh token is authentic
  jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || userFound.username !== decoded.username)
      return res.sendStatus(403);
    //if refresh token is authentic, create new access token and send
    const roleValues = Object.values(userFound.roles);
    const newAccessToken = jwt.sign(
      {
        userInfo: {
          roles: userFound.roleValues,
          username: decoded.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360s" }
    );
    return res.json({ accessToken: newAccessToken });
  });
};

module.exports = { handlleRefreshToken };
