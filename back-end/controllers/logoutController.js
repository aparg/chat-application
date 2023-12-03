const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const path = require("path");
const fsPromises = require("fs").promises;
const userLogout = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(203); //successful request cause, the user wasnt logged in in the first place
  const refreshToken = cookies.jwt;
  const loggedOutUserFound = usersDB.users.find(
    (user) => user?.refreshToken === refreshToken
  );
  if (loggedOutUserFound) {
    const otherUsers = usersDB.users.filter(
      (user) => user?.refreshToken !== refreshToken
    );
    const loggedOutUser = {
      username: loggedOutUserFound.username,
      password: loggedOutUserFound.password,
    };
    usersDB.setUsers([...otherUsers, loggedOutUser]);
    fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    //clear the jwt cookie so it cant refresh
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true });
  return res.sendStatus(204);
};

module.exports = { userLogout };
