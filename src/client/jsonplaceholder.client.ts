import axios from 'axios';
import { logger } from '../config/logger';
import { 
  IPost, 
  IComment, 
  IUser, 
  ITodo, 
  IAlbum, 
  IPhoto,
  ApiResponse
} from '../types/jsonplaceholder.types';

/**
 * JSONPlaceholder API Client
 * A client for consuming the JSONPlaceholder API (https://jsonplaceholder.typicode.com/)
 */
export class JsonPlaceholderClient {
  private baseUrl: string;

  /**
   * Constructor
   * @param baseUrl - Base URL for the JSONPlaceholder API
   */
  constructor(baseUrl: string = 'https://jsonplaceholder.typicode.com') {
    this.baseUrl = baseUrl;
  }

  /**
   * Handle API errors
   * @param error - Error object
   * @returns - Error message
   */
  private handleError(error: unknown): never {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as any;
      logger.error(`API Error: ${axiosError.message}`);
      
      if (axiosError.response) {
        logger.error(`Status: ${axiosError.response.status}`);
        logger.error(`Data: ${JSON.stringify(axiosError.response.data)}`);
      }
      
      throw new Error(`API Error: ${axiosError.message}`);
    }
    
    logger.error(`Unexpected error: ${error}`);
    throw new Error('An unexpected error occurred');
  }

  /**
   * Process API response
   * @param response - Axios response
   * @returns - Processed API response
   */
  private processResponse<T>(response: any): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  /**
   * Get all posts
   * @returns - Promise with posts data
   */
  async getPosts(): Promise<ApiResponse<IPost[]>> {
    try {
      const response = await axios.get<IPost[]>(`${this.baseUrl}/posts`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get a post by ID
   * @param id - Post ID
   * @returns - Promise with post data
   */
  async getPostById(id: number): Promise<ApiResponse<IPost>> {
    try {
      const response = await axios.get<IPost>(`${this.baseUrl}/posts/${id}`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create a new post
   * @param post - Post data
   * @returns - Promise with created post data
   */
  async createPost(post: Omit<IPost, 'id'>): Promise<ApiResponse<IPost>> {
    try {
      const response = await axios.post<IPost>(`${this.baseUrl}/posts`, post);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update a post
   * @param id - Post ID
   * @param post - Post data
   * @returns - Promise with updated post data
   */
  async updatePost(id: number, post: Partial<Omit<IPost, 'id'>>): Promise<ApiResponse<IPost>> {
    try {
      const response = await axios.put<IPost>(`${this.baseUrl}/posts/${id}`, post);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete a post
   * @param id - Post ID
   * @returns - Promise with deletion status
   */
  async deletePost(id: number): Promise<ApiResponse<{}>> {
    try {
      const response = await axios.delete(`${this.baseUrl}/posts/${id}`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get comments for a post
   * @param postId - Post ID
   * @returns - Promise with comments data
   */
  async getCommentsByPostId(postId: number): Promise<ApiResponse<IComment[]>> {
    try {
      const response = await axios.get<IComment[]>(`${this.baseUrl}/posts/${postId}/comments`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get all users
   * @returns - Promise with users data
   */
  async getUsers(): Promise<ApiResponse<IUser[]>> {
    try {
      const response = await axios.get<IUser[]>(`${this.baseUrl}/users`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get a user by ID
   * @param id - User ID
   * @returns - Promise with user data
   */
  async getUserById(id: number): Promise<ApiResponse<IUser>> {
    try {
      const response = await axios.get<IUser>(`${this.baseUrl}/users/${id}`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get todos for a user
   * @param userId - User ID
   * @returns - Promise with todos data
   */
  async getTodosByUserId(userId: number): Promise<ApiResponse<ITodo[]>> {
    try {
      const response = await axios.get<ITodo[]>(`${this.baseUrl}/users/${userId}/todos`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get albums for a user
   * @param userId - User ID
   * @returns - Promise with albums data
   */
  async getAlbumsByUserId(userId: number): Promise<ApiResponse<IAlbum[]>> {
    try {
      const response = await axios.get<IAlbum[]>(`${this.baseUrl}/users/${userId}/albums`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get photos for an album
   * @param albumId - Album ID
   * @returns - Promise with photos data
   */
  async getPhotosByAlbumId(albumId: number): Promise<ApiResponse<IPhoto[]>> {
    try {
      const response = await axios.get<IPhoto[]>(`${this.baseUrl}/albums/${albumId}/photos`);
      return this.processResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}
