//takes roles that must be needed as arguments and compares it to the decoded roles from access token
const verifyRole = (...rolesAllowed) => {
  return (req, res, next) => {
    const rolesArray = [...rolesAllowed];
    const roleMatched = req.roles.find((role) => rolesArray.includes(role));
    if (!roleMatched) {
      return res.sendStatus(401);
    }
    next();
  };
};

module.exports = verifyRole;
