const User = require("../api/models/User.model");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json("You shall not pass!");
    }
    const fixedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(fixedToken);
    const user = await User.findById(id);

    user.contraseña = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json("You shall not pass!");
  }
};

const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(400).json("You shall not pass!");
      }
      const fixedToken = token.replace("Bearer ", "");
      const { id } = verifyJwt(fixedToken);
      const user = await User.findById(id);
  
      if (user.rol === "isAdmin") {
        user.password = null;
        req.user = user;
        next();
    } else {
        return res.status(400).json("You need to be an administrator");
    }
    } catch (error) {
      return res.status(400).json("You shall not pass!");
    }
  };

module.exports = { isAuth, isAdmin };
