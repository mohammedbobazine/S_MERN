const postModel = require("../Models/post.model");
const PostModel = require("../Models/post.model");
const UserModel = require("../Models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error on get data : " + err);
    }
  });
};

module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  const updateRecord = {
    message: req.body.message,
  };
  //console.log(updateRecord);
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    {
      new: true,
    },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log("Update Post : " + err);
      }
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error Delete post" + err);
    }
  });
};
