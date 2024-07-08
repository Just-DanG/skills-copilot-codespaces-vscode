// Create web server
// Load the express module
var express = require('express');
var app = express();

// Load the body-parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load the comments module
var comments = require('./comments');

// Create a new comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.add(comment, function(err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json(comment);
  });
});

// Get all comments
app.get('/comments', function(req, res) {
  comments.getAll(function(err, comments) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(comments);
  });
});

// Get a comment by id
app.get('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments.get(id, function(err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    if (!comment) {
      return res.status(404).end();
    }
    res.json(comment);
  });
});

// Update a comment by id
app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  comments.update(id, comment, function(err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    if (!comment) {
      return res.status(404).end();
    }
    res.json(comment);
  });
});

// Delete a comment by id
app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments.delete(id, function(err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    if (!comment) {
      return res.status(404).end();
    }
    res.json(comment);
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});

// End of file