const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true, maxlength: 5000 },
  author: { type: String, required: true },
  tags: { type: [String], validate: { validator: tags => tags.every(tag => tag.length <= 50) } },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
