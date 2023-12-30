// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "config", ".env") });
const { connectDB } = require("./config/dbConnect");
const user = require("./model/User");
const morgan = require("morgan");
const cors = require("cors");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Routes

// GET: RETURN ALL USERS
app
  .route("/users")
  .get(async (req, res) => {
    try {
      const users = await user.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  // POST: ADD A NEW USER TO THE DATABASE
  .post(async (req, res) => {
    try {
      await user.create(req.body);
      res.status(200).json({ Message: "Created people successful" });
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  });

// PUT: EDIT A USER BY ID
app
  .route("/users/:id")
  .put(async (req, res) => {
    try {
      const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  })

  // DELETE: REMOVE A USER BY ID
  .delete(async (req, res) => {
    try {
      const deletedUser = await user.findByIdAndDelete(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  });

// start app
const startApp = async () => {
  await connectDB();
  app.listen(port, () => console.log(`Listening at ${port}`));
};

startApp();
