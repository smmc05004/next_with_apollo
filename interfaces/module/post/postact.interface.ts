import { Post, doneParam, DbPost } from './post.interface';

export enum postActionTypes {
  POST_REQUEST = 'POST_REQUEST',
  POST_SUCCESS = 'POST_SUCCESS',
  POST_FAILURE = 'POST_FAILURE',
  POSTS_REQUEST = 'POSTS_REQUEST',
  POSTS_SUCCESS = 'POSTS_SUCCESS',
  POSTS_FAILURE = 'POSTS_FAILURE',
  DONE_REQUEST = 'DONE_REQUEST',
  DONE_SUCCESS = 'DONE_SUCCESS',
  DONE_FAILURE = 'DONE_FAILURE',
}

export type PostActions = Post_request | Post_success | Post_failure | Posts_request | Posts_success | Posts_failure | Done_request | Done_success | Done_failure ;

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
  posts: DbPost[]
}

export interface Posts_failure {
  type: postActionTypes.POSTS_FAILURE;
}

export interface Done_request {
  type: postActionTypes.DONE_REQUEST;
  payload: doneParam
}

export interface Done_success {
  type: postActionTypes.DONE_SUCCESS;
}

export interface Done_failure {
  type: postActionTypes.DONE_FAILURE;
}