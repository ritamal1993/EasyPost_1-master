const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

const app = express();
app.use(cors());



mongoose
  .connect(
    'mongodb+srv://easyPost:uTk5AJLDeOWcnxiG@cluster0-pm8md.mongodb.net/test'
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Headers, Access-Control-Allow-Methods"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;

