const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post by ID
router.put('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post by ID
router.delete('/:postId', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
