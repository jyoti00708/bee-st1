const Post = require('../models/postModel');


const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { content, author } = req.body;
    const newComment = { content, author };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const getAllCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateCommentInPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const commentToUpdate = post.comments.id(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    commentToUpdate.content = content;
    await post.save();

    res.status(200).json({ message: 'Comment updated successfully', comment: commentToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const deleteCommentInPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.id(commentId).remove();
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  addCommentToPost,
  getAllCommentsForPost,
  updateCommentInPost,
  deleteCommentInPost,
};
