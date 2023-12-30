const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Pls enter Your name"] },
  age: {
    type: Number,
    required: [true, "Pls enter your age"],
    minlength: [2, "pls provide a valid age"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Pls enter an email"],
    lowercase: true,
    validate: [isEmail, "pls enter a valid email"],
  },
});

// Create a Person model using the schema
const user = mongoose.model("user", userSchema);
module.exports = user;
