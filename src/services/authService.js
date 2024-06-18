const { jwtDecode } = require("jwt-decode");

module.exports.authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    console.error(`Invalid Token`, 401);
    res.status(401).send(`Invalid Token`);
  }
  try {
    const decoded = jwtDecode(authToken);
    req.user = {userId: decoded?.sub, email: decoded?.email}
    console.log(req.user)
  } catch (error) {
    console.log(error);
    res.status(401).send(`Invalid Token`);
  }

  next();
};
