// const express = require('express');
// const router = express.Router();
// const {
//   getAllPosts,
//   getPostById,
//   updatePostById,
//   deletePostById,
// } = require('../controllers/postController');
// router.post('/:postId/comments', getAllPosts);
// router.get('/:postId/comments', getPostById);
// router.put('/:postId/comments/:commentId', updatePostById);
// router.delete('/:postId/comments/:commentId', deletePostById);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} = require('../controllers/postController');


router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.put('/:postId', updatePostById);
router.delete('/:postId', deletePostById);

module.exports = router;

