/**
 * JSONPlaceholder API types
 */

/**
 * Post interface
 */
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Comment interface
 */
export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * User interface
 */
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

/**
 * Todo interface
 */
export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Album interface
 */
export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

/**
 * Photo interface
 */
export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/**
 * Response types for API calls
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
