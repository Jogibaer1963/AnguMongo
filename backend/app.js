const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
  const post = req.body;
  console.log(post)
  res.status(201).json({
    message: 'Post added successfully.',
  });
})

app.get("/api/posts", (req,
                       res,
                       next) => {
  const posts = [
    {
      id: 'zed665body',
      title: 'First server side post',
      content: 'This is coming from the server'
    },
    {
      id: 'wze223dfb',
      title: 'second server side post',
      content: 'This is coming from the server too'
    }
  ];
  res.status(200).json({
    message: 'respond successfully',
    posts: posts
  });
})

module.exports = app;
