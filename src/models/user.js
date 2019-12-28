const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error("Password must have more than 7 characters");
      } else if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not include 'password'");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  // console.log(user, "user  from schema");

  const token = jwt.sign({ _id: user._id.toString() }, "thisisodejsbackend");

  user.tokens = user.tokens.concat({ token : token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// Hash the plain text password  before ssaving
userSchema.pre("save", async function(next) {
  const user = this; //"this" indivisual user that is about to save

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  console.log("Just before saving");

  next();
});

const User = mongoose.model("User", userSchema);

User.createIndexes();

module.exports = User;
