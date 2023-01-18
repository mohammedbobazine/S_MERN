const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  //console.log({ tokenJwt: token });
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        //console.log({ deconctedToken: decodedToken.id });
        res.locals.user = user;
        //console.log({ chekUser: user });
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // console.log(err);
      } else {
        // console.log({ decodededToken: decodedToken.id });
        next();
      }
    });
  } else {
    console.log("No Token");
  }
};
