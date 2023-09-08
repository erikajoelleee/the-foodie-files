import sendRequest from "./send-request";
const BASE_URL = '/api/posts';

export async function createPost(postData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', postData, true);
}

export async function fetchPostById(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, 'GET');
}

export async function updatePost(updatedPost) {
  try {
    const updated = sendRequest(`${BASE_URL}/${updatedPost.id}`, 'PUT', updatedPost, true);
    return updated;
    
  } catch (error) {
    throw new Error('Failed to update the post');
  }
}

export async function deletePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, 'DELETE');
}

export async function fetchPosts() {
  try {
    const posts = await sendRequest(BASE_URL, 'GET');
    return posts;
    
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchPostsByCategory(category) {
  try {
    const posts = await sendRequest(`${BASE_URL}/category/${category}`, 'GET');
    return posts;

  } catch(error) {
    throw new Error('Failed to fetch posts');
  }
}