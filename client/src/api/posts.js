import axios from "./axios";

// Fetch posts
export const fetchPosts = async (token, page = 1) => {
  const response = await axios.get(`/posts/feed?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Like a post
export const likePost = async (token, postId) => {
  const response = await axios.put(`/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Comment on a post
export const commentOnPost = async (token, postId, text) => {
  const response = await axios.put(`/posts/${postId}/comment`, { text }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
