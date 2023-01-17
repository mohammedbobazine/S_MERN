const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

/** Création du Model pour l'utilisateur */

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
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

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
