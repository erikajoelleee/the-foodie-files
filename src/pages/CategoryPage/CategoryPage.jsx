import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { PiArrowFatUpBold, PiArrowFatDownBold } from 'react-icons/pi';
import * as postsAPI from '../../utilities/posts-api';

export default function CategoryPage() {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
    try {
        const fetchedPosts = await postsAPI.fetchPostsByCategory(category);
        const sortedPosts = fetchedPosts.sort((a, b) => b._id.localeCompare(a._id));
        setPosts(sortedPosts);

    } catch (error) {
        console.error(error);
    }
    };

    fetchPosts();
  }, [category]);

  const handleLike = () => {
    setLikeClicked(!likeClicked);
    setDislikeClicked(false);
  };

  const handleDislike = () => {
      setDislikeClicked(!dislikeClicked);
      setLikeClicked(false);
  };

  return (
      <div className="home-page">
          <h1 className="home-page-header">{`welcome to /${category}`}</h1>
          {posts.length === 0 ? (
            <h3 className="Loading-post-page">Loading...</h3>
          ) : (
            posts.map((post) => {
                const createdAtDate = new Date(post.createdAt);
                const formattedDate = createdAtDate.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
                const formattedTime = createdAtDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                });

                return (
                    <Link to={`/posts/${post._id}`} key={post._id} className="post-link">
                        <div className="post-page">
                            <div className="post-on-postpage">
                                <div className="postpage-buttons">
                                    <div className="vertical-buttons">
                                        <button onClick={handleLike} className={`like-button ${likeClicked ? 'liked' : ''}`} title="Like">
                                            {likeClicked ? <PiArrowFatUpBold className="liked-icon" /> : <PiArrowFatUpBold />}
                                        </button>
                                        <button onClick={handleDislike} className={`dislike-button ${dislikeClicked ? 'disliked' : ''}`} title="Dislike">
                                            {dislikeClicked ? <PiArrowFatDownBold className="disliked-icon" /> : <PiArrowFatDownBold />}
                                        </button>
                                    </div>
                                </div>
                                <div className="post-page-rest-of-post">
                                    <div className="postedBy-postpage-div">
                                        <h6 className="post-page-category">{`/${post.category}`}</h6>
                                        <h6 className="post-page-user">{`Posted by: ${post.user.name}`}</h6>
                                    </div>
                                    <div className="post-page-created-div">
                                        <h6 className="post-page-created-at">{`Created: ${formattedDate} at ${formattedTime}`}</h6>
                                    </div>
                                    <div className="postpage-title-div">
                                        <h3 className="post-page-title">{post.title}</h3>
                                    </div>
                                    <div className="postpage-content-div">
                                        <p className="post-page-content">{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
              );
            })
          )}
      </div>
  );
}