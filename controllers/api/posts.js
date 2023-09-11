const Post = require('../../models/post');

module.exports = {
  create,
  getPostById,
  fetchPosts,
  fetchPostsByCategory,
  updatePost,
  deletePost
};

async function create(req, res) {
    const { category, title, content } = req.body;
    const { name, _id } = req.user;

    try {
      const newPost = await Post.create({ 
        category: category,
        title: title,
        content: content,
        user: { name, _id }
      });
      res.json(newPost);

      console.log(newPost);


    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
    }
}

async function getPostById(req, res) {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId).populate('user').exec();

        // if there is no post with that id
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);

        console.log(post);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving post' });
    }

}

async function fetchPosts(req, res) {
    try {
        // Fetch all posts from the database
        const posts = await Post
        .find()
        .populate('user')
        .sort({ _id: -1 })
        .exec();
    
        // Send the posts data in the response
        res.json(posts);

      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Failed to fetch posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
      }
}

async function fetchPostsByCategory(req, res) {
    try {
        const category = req.params.category;

        // fetch post from db
        const posts = await Post
        .find({ category })
        .populate('user')
        .sort({ _id: -1 })
        .exec();
        
        // send posts in response
        res.json(posts);

    } catch (error) {
        console.error('Failed to fecth posts by category: ', error);
        res.status(500).json({ error: 'Failed to fetch posts by category' });
    }

}

async function updatePost(req, res) {
    try {
        const { postId } = req.params;
        const { category, title, content } = req.body;
    
        // Find the post by ID
        const post = await Post.findById(postId);
    
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        // Update the post fields
        post.category = category;
        post.title = title;
        post.content = content;
    
        // Save the updated post
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

        // if post not exist, send 404
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // now, delete the post
        await post.remove();
        
        // indicate successful delete
        res.status(200).json({ message: 'Post has been deleted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete the post' });
    }


}