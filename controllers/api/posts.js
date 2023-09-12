const Post = require('../../models/post');

module.exports = {
  create,
  getPostById,
  fetchPosts,
  fetchPostsByCategory,
  updatePost,
  deletePost,
};

async function create(req, res) {
  const { category, title, content } = req.body;
  const { name, _id } = req.user;

  try {
    const newPost = await Post.create({
      category,
      title,
      content,
      user: { name, _id },
    });
    console.log(newPost);
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
}

async function getPostById(req, res) {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('user').exec();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log(post);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving post' });
  }
}

async function fetchPosts(req, res) {
  try {
    const posts = await Post.find().populate('user').sort({ _id: -1 }).exec();
    res.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

async function fetchPostsByCategory(req, res) {
  try {
    const category = req.params.category;
    const posts = await Post.find({ category }).populate('user').sort({ _id: -1 }).exec();
    res.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts by category: ', error);
    res.status(500).json({ error: 'Failed to fetch posts by category' });
  }
}

async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { category, title, content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.category = category;
    post.title = title;
    post.content = content;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the post' });
  }
}

async function deletePost(req, res) {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.remove();

    res.status(200).json({ message: 'Post has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the post' });
  }
}
