const Users = require("../models/Users");
/*For file based routing*/
// const usersDB = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const fsPromises = require("fs").promises;
const path = require("path");
const userLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(203); //successful request cause, the user wasnt logged in in the first place
  const refreshToken = cookies.jwt;
  const filter = { refreshToken: refreshToken };
  const update = { refreshToken: "" };
  const loggedOutUser = await Users.findOneAndUpdate(filter, update, {
    new: true,
  }).exec();
  // usersDB.setUsers([...otherUsers, loggedOutUser]);
  // const loggedOutUserFound = usersDB.users.find(
  //   (user) => user?.refreshToken === refreshToken
  // );
  // if (loggedOutUserFound) {
  //   const otherUsers = usersDB.users.filter(
  //     (user) => user?.refreshToken !== refreshToken
  //   );
  //   const loggedOutUser = {
  //     username: loggedOutUserFound.username,
  //     password: loggedOutUserFound.password,
  //   };
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "models", "users.json"),
  //   JSON.stringify(usersDB.users)
  // );
  //clear the jwt cookie so it cant refresh
  //   res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  //   return res.sendStatus(204);
  // }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.sendStatus(204);
};

module.exports = { userLogout };
