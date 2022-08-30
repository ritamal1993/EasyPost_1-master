const Post = require("../models/post");
const Comment = require("../models/comment");


exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId || req.userData.role === 'a' }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find().populate('creator');

  //add comments to post
  Post.aggregate([{
    $lookup:{
      from: 'comments',
      localField: '_id',
      foreignField: 'postId',
      as: 'comments'
    }
  }]).exec(function(err, comments){
  });



  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  const postQuery = Post.find().populate('creator');
  let fetchedPosts;
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};


exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.getPostByTitle = (req, res, next) => {
  console.log(req.params.title);
  Post.find({ title: { $regex: req.params.title, $options: "i" }}).then(posts => {
    console.log(posts);
    if (posts) {
      res.status(200).json({posts: posts});
    } else {
      res.status(404).json({ message: "post not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error"
    });
  });
};

exports.getPostByUserName = (req, res, next) => {
  console.log(req.params.userName);
  Post.find({ creator: { $regex: req.params.userName, $options: "i" }}).then(posts => {
    console.log(posts);
    if (posts) {
      res.status(200).json({posts: posts});
    } else {
      res.status(404).json({ message: "post not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Erasdadror"
    });
  });
};

exports.getPostByContent = (req, res, next) => {
  console.log(req.params);
  Post.find({ content: { $regex: req.params.content, $options: "i" }}).then(posts => {
    console.log(posts);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "post not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error !"
    });
  });
};

exports.getPostsByUser = (req, res, next) => {
  Post.find({creator: req.params.id}).then(info => {
    if (info) {
      res.status(200).json(info);
    } else {
      //res.status(404).json({ message: "user not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error"
    });
  });
};

exports.deletePost = (req, res, next) => {

  Comment.deleteMany({postId: req.params.id}, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};

