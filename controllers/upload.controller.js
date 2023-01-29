const UserModel = require("../Models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utlis");

module.exports.uploadProfil = async (req, res) => {
  // console.log(req.file.mimetype);
  try {
    if (req.file.size > 500000) {
      throw Error("capcité depasser");
    }

    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    ) {
      throw Error("Format d'image invalide");
    }
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = req.body.name + ".jpg";

  try {
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/profil/${fileName}`
      )
    );
  } catch (err) {}
  /* console.log(req.body.userId);
  console.log(fileName);*/
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picure: "./uploads/profil/" + fileName } },
      { new: true /*, upsert: true, setDefaultsOnInsert: true */ },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {}
};
