const UserModel = require("../Models/user.model");

module.exports.singUp = async (req, res) => {
  console.log(req.body);

  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};
