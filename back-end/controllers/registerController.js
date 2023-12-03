const fsPromises = require("fs").promises;
const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const path = require("path");
const addNewUser = async (req, res) => {
  const { name, pwd } = req.body;
  if (!name || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password is compulsary" });
  }
  //check duplicates
  const duplicate = usersDB.users.find((person) => person.username === name);

  if (duplicate) {
    return res.status(409).json({ message: "Username already exists" });
  }

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    usersDB.setUsers([
      ...usersDB.users,
      { username: name, password: hashedPwd },
    ]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    return res.status(201).json({ message: "User Registered!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addNewUser };
