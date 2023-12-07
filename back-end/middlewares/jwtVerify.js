const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) return res.status(401).json({ message: "Not authorized" });
  const token = authToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //decoded is the value after acces token is decrypted
    if (err) return res.sendStatus(403);
    req.user = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
};

module.exports = { verifyToken };
