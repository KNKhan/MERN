const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, "Asdf@Lkj12$");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Not valid token" });
  }
};
