const express = require('express');
const router = express.Router();
const {
  addCommentToPost,
  getAllCommentsForPost,
  updateCommentInPost,
  deleteCommentInPost,
} = require('../controllers/commentController');

router.post('/:postId/comments', addCommentToPost);
router.get('/:postId/comments', getAllCommentsForPost);
router.put('/:postId/comments/:commentId', updateCommentInPost);
router.delete('/:postId/comments/:commentId', deleteCommentInPost);

module.exports = router;
