import { JsonPlaceholderClient } from './jsonplaceholder.client';
import { logger } from '../config/logger';

/**
 * Example usage of the JSONPlaceholder client
 * This file demonstrates how to use the JsonPlaceholderClient to interact with the JSONPlaceholder API
 */
async function runExamples() {
  // Create a new instance of the client
  const client = new JsonPlaceholderClient();
  
  try {
    // Example 1: Get all posts
    logger.info('Example 1: Getting all posts...');
    const postsResponse = await client.getPosts();
    logger.info(`Retrieved ${postsResponse.data.length} posts`);
    logger.info(`First post title: ${postsResponse.data[0].title}`);
    
    // Example 2: Get a specific post
    const postId = 1;
    logger.info(`Example 2: Getting post with ID ${postId}...`);
    const postResponse = await client.getPostById(postId);
    logger.info(`Post title: ${postResponse.data.title}`);
    logger.info(`Post body: ${postResponse.data.body}`);
    
    // Example 3: Get comments for a post
    logger.info(`Example 3: Getting comments for post with ID ${postId}...`);
    const commentsResponse = await client.getCommentsByPostId(postId);
    logger.info(`Retrieved ${commentsResponse.data.length} comments`);
    logger.info(`First comment: ${commentsResponse.data[0].name} (${commentsResponse.data[0].email})`);
    
    // Example 4: Create a new post
    logger.info('Example 4: Creating a new post...');
    const newPost = {
      title: 'New Post Title',
      body: 'This is the body of the new post',
      userId: 1
    };
    const createResponse = await client.createPost(newPost);
    logger.info(`Created post with ID: ${createResponse.data.id}`);
    logger.info(`Response status: ${createResponse.status}`);
    
    // Example 5: Update a post
    const updateId = 1;
    logger.info(`Example 5: Updating post with ID ${updateId}...`);
    const updateData = {
      title: 'Updated Post Title',
      body: 'This is the updated body of the post'
    };
    const updateResponse = await client.updatePost(updateId, updateData);
    logger.info(`Updated post title: ${updateResponse.data.title}`);
    logger.info(`Response status: ${updateResponse.status}`);
    
    // Example 6: Get user information
    const userId = 1;
    logger.info(`Example 6: Getting user with ID ${userId}...`);
    const userResponse = await client.getUserById(userId);
    logger.info(`User name: ${userResponse.data.name}`);
    logger.info(`User email: ${userResponse.data.email}`);
    logger.info(`User company: ${userResponse.data.company.name}`);
    
    // Example 7: Get todos for a user
    logger.info(`Example 7: Getting todos for user with ID ${userId}...`);
    const todosResponse = await client.getTodosByUserId(userId);
    logger.info(`Retrieved ${todosResponse.data.length} todos`);
    const completedTodos = todosResponse.data.filter(todo => todo.completed).length;
    logger.info(`Completed todos: ${completedTodos}`);
    logger.info(`Pending todos: ${todosResponse.data.length - completedTodos}`);
    
    // Example 8: Get albums and photos
    logger.info(`Example 8: Getting albums for user with ID ${userId}...`);
    const albumsResponse = await client.getAlbumsByUserId(userId);
    logger.info(`Retrieved ${albumsResponse.data.length} albums`);
    
    if (albumsResponse.data.length > 0) {
      const albumId = albumsResponse.data[0].id;
      logger.info(`Getting photos for album with ID ${albumId}...`);
      const photosResponse = await client.getPhotosByAlbumId(albumId);
      logger.info(`Retrieved ${photosResponse.data.length} photos`);
      logger.info(`First photo title: ${photosResponse.data[0].title}`);
      logger.info(`First photo URL: ${photosResponse.data[0].url}`);
    }
    
    // Example 9: Delete a post
    const deleteId = 1;
    logger.info(`Example 9: Deleting post with ID ${deleteId}...`);
    const deleteResponse = await client.deletePost(deleteId);
    logger.info(`Delete response status: ${deleteResponse.status}`);
    
  } catch (error) {
    logger.error('Error in examples:', error);
  }
}

// Run the examples when this file is executed directly
if (require.main === module) {
  runExamples()
    .then(() => logger.info('Examples completed'))
    .catch(error => logger.error('Examples failed:', error));
}

export { runExamples };
