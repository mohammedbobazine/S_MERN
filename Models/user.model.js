const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

/** Création du Model pour l'utilisateur */

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picure: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },

    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Cryptage du mot de passe
 */
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  //console.log({ utilisateur: user });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    // console.log({ authentification: auth });
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
