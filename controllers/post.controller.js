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
  }).sort({ createdAt: -1 });
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

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          likers: req.body.id,
        },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: {
          likes: req.params.id,
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.status(201).send(docs);
        }
      }
    );
  } catch (error) {}
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.id))
    return res.status(400).send("ID non valid :" + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likers: req.body.id,
        },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: {
          likes: req.params.id,
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.status(201).send(docs);
        }
      }
    );
  } catch (error) {}
};

module.exports.commentPost = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.commenterId)
  )
    return res.status(400).send("ID non valid :" + req.params.id);

  console.log(req.body);
  try {
    return await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          return res.send(docs);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.commentId))
    return res.status(400).send("ID non valid :" + req.params.id);
  /*console.log(req.body);
  console.log(req.params.id);*/

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const TheComment = docs.comments.find((c) => {
        /*  console.log(c._id.valueOf());
        console.log(req.body.commentId);
        console.log(c._id.equals(req.body.commentId));*/
        if (c._id.equals(req.body.commentId)) {
          return c;
        }
      });
      //console.log({ lecommentaire: TheComment });
      if (!TheComment) {
        return res.status(404).send("Comment Not found");
      } else {
        TheComment.text = req.body.text;

        return docs.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(docs);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID non valid :" + req.params.id);
  }

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      {
        new: true,
      },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (error) {}
};
