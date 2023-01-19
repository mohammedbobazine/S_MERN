const UserModel = require("../Models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("ID inconnu" + err);
    }
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          return res.status(500).send({ messge: err });
        }
      }
    );
  } catch (error) {}
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: " supression avec succée" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.follow = async (req, res) => {
  /** Vérification des ID's  */

  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID non valid :" + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { following: req.body.idToFollow },
    });

    console.log(req.body);
    console.log(req.params.id);

    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) {
          res.status(201).json(docs);
        } else {
          return res.status(400).json({ message: err });
        }
      }
    );
  } catch (error) {
    //  console.log(error);
  }
};

//***********unfolling***********

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID non valid :" + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(req.params.id, {
      $pull: { following: req.body.idToUnFollow },
    });

    /*console.log(req.body);
    console.log(req.params.id);*/

    await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) {
          res.status(201).json(docs);
        } else {
          return res.status(400).json({ message: err });
        }
      }
    );
  } catch (error) {
    //return res.status(500).json({ message: error });
  }
};
