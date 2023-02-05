const UserModel = require("../Models/user.model");
const fs = require("fs");
const { promisify } = require("util");
//const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utlis");
const sharp = require("sharp");

module.exports.uploadProfil = async (req, res) => {
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
  console.log({ File_Name: fileName });

  try {
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`${__dirname}/../client/public/uploads/profil/${fileName}`);
    res.status(201).send("Image uploaded succesfully");
  } catch (error) {
    console.log(error);
  }
  console.log({ Buffer_File: req.file.buffer });

  // hna badat la méthode man pipline l sharp
  /*
  *
  *
  **try {
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/profil/${fileName}`
      )
    );
  } catch (err) {}
  *
  *
  * */

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
