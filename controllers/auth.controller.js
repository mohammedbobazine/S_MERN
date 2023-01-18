const UserModel = require("../Models/user.model");

const jwt = require("jsonwebtoken");
const { singUpErrors } = require("../utils/errors.utlis");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.singUp = async (req, res) => {
  //console.log(req.body);

  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = singUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    // console.log({ user: user });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(200).json(error);
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
