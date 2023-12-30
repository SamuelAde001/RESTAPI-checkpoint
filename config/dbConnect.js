const mongoose = require("mongoose");

// Connect to the database

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to DB");
};

module.exports = { connectDB };
