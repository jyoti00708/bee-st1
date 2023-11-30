const express = require('express');
const router = express.Router({ mergeParams: true });
const Post = require('../models/post');
const Comment = require('../models/comment');

// Add a new comment to a post
router.post('/', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create(req.body);
    post.comments.push(comment);
    await post.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all comments for a specific post
router.get('/', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comments');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a comment by ID within a post
router.put('/:commentId', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment by ID within a post
router.delete('/:commentId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.pull(req.params.commentId);
    await post.save();

    const deletedComment = await Comment.findByIdAndRemove(req.params.commentId);
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
