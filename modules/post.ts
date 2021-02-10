import { postActionTypes, PostActions, Post_request, Post_success, Post_failure, Posts_request, Posts_success, Posts_failure } from '../interfaces/module/post/postact.interface';
import { postState, Post, Posts } from '../interfaces/module/post/post.interface';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as postAPI from '../pages/api/post';

interface postParam {
  post: Post
}

interface postsParam {
  posts: Posts
}

interface postsRequestParam {
  id : string
}

//  --------------------------------------- post action creators  --------------------------------------- 
// add post request
export const postRequest = ({ post }: postParam): Post_request => {
  return ({
    type: postActionTypes.POST_REQUEST,
    payload: post
  });
}

// add post success
export const postSuccess = ({ post }: postParam): Post_success => {
  return ({
    type: postActionTypes.POST_SUCCESS,
    post: post
  });
}

// add post failure
export const postFailure = (): Post_failure => {
  return ({
    type: postActionTypes.POST_FAILURE,
  });
}

// post list request
export const postsRequest = ({ id }: postsRequestParam): Posts_request => {
  return ({
    type: postActionTypes.POSTS_REQUEST,
    payload: id
  });
}

// post list success
export const postsSuccess = ({ posts }: postsParam): Posts_success => {
  return ({
    type: postActionTypes.POSTS_SUCCESS,
    posts: posts
  });
}

// post list failure
export const postsFailure = (): Posts_failure => {
  return ({
    type: postActionTypes.POSTS_FAILURE,
  });
}

//  --------------------------------------- post init state  --------------------------------------- 
const initialState: postState = {
  posts : [],
  post : null,
}


// --------------------------------------- post sagas --------------------------------------- 
export function* postSaga() {
  yield takeLatest(postActionTypes.POST_REQUEST, addPostSaga);
  yield takeLatest(postActionTypes.POSTS_REQUEST, getPostsSaga);
}

function* addPostSaga(action: Post_request) {
  const { payload } = action;

  if (!payload) return;
  
  const addRes = yield call(postAPI.addPost, payload);
  if (addRes.status === 200) {
    yield put(postSuccess({post: payload}));
  } else {
    yield put(postFailure());
  }
}

function* getPostsSaga(action: Posts_request) {
  const { payload } = action;
  if (!payload) return;

  const getRes = yield call(postAPI.getPosts, payload);
  console.log('getRes: ', getRes);
  if (getRes.status === 200) {
    console.log('성공');
    const posts = getRes.data;
    yield put(postsSuccess({ posts }));
  } else {
    console.log('실패');
    yield put(postsFailure())
  }

}

// --------------------------------------- post reducer --------------------------------------- 
const post = (state = initialState, action: PostActions ): postState => {
  switch(action.type) {
    case postActionTypes.POST_SUCCESS:
      const post = action.post;
      return {
        ...state,
        post: post,
      }
    case postActionTypes.POST_FAILURE:
      return {
        ...state,
        post: null,
      }
    case postActionTypes.POSTS_SUCCESS:
      const posts = action.posts;
      return {
        ...state,
        posts: posts,
      }
    case postActionTypes.POSTS_FAILURE:
      return {
        ...state,
        posts: [],
      }
    default:
      return {
        ...state
      }
  }
}

export default post;