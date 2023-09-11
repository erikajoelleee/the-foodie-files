const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/posts'

// POST /api/posts/new
router.post('/new', ensureLoggedIn, postsCtrl.create);

// GET /api/posts
router.get('/', ensureLoggedIn, postsCtrl.fetchPosts);

// GET /api/posts/category/:category
router.get('/category/:category', ensureLoggedIn, postsCtrl.fetchPostsByCategory);

// GET /posts/:postId
router.get('/:postId', ensureLoggedIn, postsCtrl.getPostById);

// PUT /api/posts/:postId
router.put('/:postId', ensureLoggedIn, postsCtrl.updatePost);

router.delete('/:postId', ensureLoggedIn, postsCtrl.deletePost);

module.exports = router;