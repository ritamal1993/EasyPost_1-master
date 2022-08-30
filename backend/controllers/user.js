const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const User = require("../models/user");

exports.createUser = (req, res, next) => {
  console.log(req.body.userName)
  bcrypt.hash(req.body.password, 10).then(hash => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.country + '&key=AIzaSyB8XAU04VdSHgN5dRbXGQAOZxfjjDe8W3k')
      .then(function (resp) {
        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          country: req.body.country,
          password: hash,
          lat:  resp.data.results[0].geometry.location.lat,
          lng:resp.data.results[0].geometry.location.lng
        });
        user
          .save()
          .then(result => {
            res.status(201).json({
              message: "User created!",
              result: result
            });
          })
          .catch(err => {
            res.status(500).json({
              message: "Invalid authentication credentials!"
            });
          });
      })
      .catch(function (error) {
        console.log(error)
      })

  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.getUserById = (req, res, next) => {
  //add posts to user
  User.aggregate([{
    $lookup:{
      from: 'posts',
      localField: '_id',
      foreignField: 'creator',
      as: 'posts'
    }
  }]).exec(function(err, posts){
    console.log(posts);
  });

  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "User not found"
        });
      }
      res.status(201).json(user);
    }).catch(error => {
    res.status(500).json({
      message: "User not found!!!"
    })
  });
}

exports.getUsers = (req, res, next) => {
  const userQuery = User.find().then(users =>
    res.status(200).json({
      message: "Users fetched successfully!",
      users: users,
    }));
}

exports.getUsersByCountry = (req, res, next) => {
  User.find({country: req.body.country}).then(users => {
    if (users) {
      res.status(200).json(users);
    } else {
      //res.status(404).json({ message: "user not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error"
    });
  });
};
