import { Post, } from './post.interface';

export enum postActionTypes {
  POST_REQUEST = 'POST_REQUEST',
  POST_SUCCESS = 'POST_SUCCESS',
  POST_FAILURE = 'POST_FAILURE',
  POSTS_REQUEST = 'POSTS_REQUEST',
  POSTS_SUCCESS = 'POSTS_SUCCESS',
  POSTS_FAILURE = 'POSTS_FAILURE',
}

export type PostActions = Post_request | Post_success | Post_failure | Posts_request | Posts_success | Posts_failure;

export interface Post_request {
  type: postActionTypes.POST_REQUEST;
  payload: Post
}

export interface Post_success {
  type: postActionTypes.POST_SUCCESS;
  post: Post
}

export interface Post_failure {
  type: postActionTypes.POST_FAILURE;
}

export interface Posts_request {
  type: postActionTypes.POSTS_REQUEST;
  payload: string
}

export interface Posts_success {
  type: postActionTypes.POSTS_SUCCESS;
  posts: Post[]
}
export interface Posts_failure {
  type: postActionTypes.POSTS_FAILURE;
}