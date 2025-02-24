import React, { useState, useEffect } from "react";
import { fetchPosts, likePost, commentOnPost } from "../api/posts";
import "../styles/Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]); // Stores posts
  const [page, setPage] = useState(1); // For infinite scrolling
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch posts on component mount and page change
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const newPosts = await fetchPosts(token, page);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [page, token]);

  // Handle like functionality
  const handleLike = async (postId) => {
    try {
      const updatedPost = await likePost(token, postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  // Handle comment functionality
  const handleComment = async (postId, text) => {
    try {
      const updatedPost = await commentOnPost(token, postId, text);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error("Failed to comment on post:", err);
    }
  };

  // Infinite scroll handler
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (posts.length === 0 && !loading) {
    return <p className="feed-empty">No posts available. Start following more users!</p>;
  }

  return (
    <div className="feed-container">
      <h1 className="feed-title">Your Feed</h1>
      <div className="feed-posts">
        {posts.map((post) => (
          <div key={post._id} className="feed-post">
            <div className="feed-post-header">
              <img src={post.user.profilePicture || "default-profile.png"} alt="Profile" className="post-profile-picture" />
              <span>{post.user.name}</span>
            </div>
            <div className="feed-post-content">
              <p>{post.content}</p>
              {post.media && <img src={post.media} alt="Post Media" className="post-media" />}
            </div>
            <div className="feed-post-actions">
              <button onClick={() => handleLike(post._id)} className="btn btn-like">
                Like ({post.likes.length})
              </button>
              <button
                onClick={() =>
                  handleComment(post._id, prompt("Enter your comment:"))
                }
                className="btn btn-comment"
              >
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading more posts...</p>}
    </div>
  );
};

export default Feed;
