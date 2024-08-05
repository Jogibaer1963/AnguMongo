const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');
const {connect} = require("mongoose");

const app = express();

connect("mongodb://localhost:27017").then(() => {
  console.log("MongoDB Connected");
})
  .catch((err) => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());


app.use((req,
         res, next) => {
  res.setHeader('Access-Control-Allow-Origin',
    '*');
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,Patch,POST,DELETE,OPTIONS");
  next();
});

app.post("/api/posts", (
  req,
  res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully.',
      postId: createdPost.id,
    });
  })
})

app.get("/api/posts", (req,
                       res,
                       next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'respond successfully',
      posts: documents
    })
  });
})

app.delete("/api/posts/:id", (req,
                              res) => {
  Post.deleteOne({_id: req.params.id}).then(result =>  {
    console.log(result)
  })
  res.status(200).json({message: 'Post Deleted successfully.'});
})


module.exports = app;
