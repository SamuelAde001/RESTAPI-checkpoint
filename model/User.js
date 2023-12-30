const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String, unique: true },
});

// Create a Person model using the schema
const user = mongoose.model("user", userSchema);
module.exports = user;
