import {
  postActionTypes,
  PostActions,
  Post_request,
  Post_success,
  Post_failure,
  Posts_request,
  Posts_success,
  Posts_failure,
  Done_request,
  Done_success,
  Done_failure,
} from "../interfaces/module/post/postact.interface";
import { postState, Post, doneParam, DbPost } from "../interfaces/module/post/post.interface";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as postAPI from "../pages/api/post";
import { loadingEnd, loadingStart } from './loading';

interface postParam {
  post: Post;
}

interface postsParam {
  posts: DbPost[];
}

interface postsRequestParam {
  id: string;
}

//  --------------------------------------- post action creators  ---------------------------------------
// add post request
export const postRequest = ({ post }: postParam): Post_request => {
  return {
    type: postActionTypes.POST_REQUEST,
    payload: post,
  };
};

// add post success
export const postSuccess = ({ post }: postParam): Post_success => {
  return {
    type: postActionTypes.POST_SUCCESS,
    post: post,
  };
};

// add post failure
export const postFailure = (): Post_failure => {
  return {
    type: postActionTypes.POST_FAILURE,
  };
};

// post list request
export const postsRequest = ({ id }: postsRequestParam): Posts_request => {
  return {
    type: postActionTypes.POSTS_REQUEST,
    payload: id,
  };
};

// post list success
export const postsSuccess = ({ posts }: postsParam): Posts_success => {
  return {
    type: postActionTypes.POSTS_SUCCESS,
    posts: posts,
  };
};

// post list failure
export const postsFailure = (): Posts_failure => {
  return {
    type: postActionTypes.POSTS_FAILURE,
  };
};

export const doneRequest = ({ id, status }: doneParam ) : Done_request => {
  return {
    type: postActionTypes.DONE_REQUEST,
    payload: {
      id,
      status
    }
  }
}

//  --------------------------------------- post init state  ---------------------------------------
const initialState: postState = {
  posts: [],
  post: null,
};

// --------------------------------------- post sagas ---------------------------------------
export function* postSaga() {
  yield takeLatest(postActionTypes.POST_REQUEST, addPostSaga);
  yield takeLatest(postActionTypes.POSTS_REQUEST, getPostsSaga);
  yield takeLatest(postActionTypes.DONE_REQUEST, doneSaga);
}

function* addPostSaga(action: Post_request) {
  const { payload } = action;

  if (!payload) return;

  const addRes = yield call(postAPI.addPost, payload);
  yield put(loadingStart());
  if (addRes.status === 200) {
    yield put(postSuccess({ post: payload }));

    const states = yield select();
    const id = states.auth.user.id;

    const getRes = yield call(postAPI.getPosts, id);
    if (getRes.status === 200) {
      yield put(loadingEnd());
      
      const posts = getRes.data;
      yield put(postsSuccess({ posts }));
    } else {
      yield put(postsFailure());
    }
  } else {
    yield put(postFailure());
  }
}

function* getPostsSaga(action: Posts_request) {
  const { payload } = action;
  if (!payload) return;

  const getRes = yield call(postAPI.getPosts, payload);
  if (getRes.status === 200) {
    const posts = getRes.data;
    yield put(postsSuccess({ posts }));
  } else {
    yield put(postsFailure());
  }
}

function* doneSaga(action: Done_request) {
  const { payload } = action;
  if (!payload) return;

  const updateRes = yield call(postAPI.done, payload);
  if (updateRes.status === 200) {

    const states = yield select();
    const id = states.auth.user.id;

    const getRes = yield call(postAPI.getPosts, id);
    if (getRes.status === 200) {
      const posts = getRes.data;
      yield put(postsSuccess({ posts }));
    } else {
      yield put(postsFailure());
    }
  } else {
    console.log('update failed');
  }
}

// --------------------------------------- post reducer ---------------------------------------
const post = (state = initialState, action: PostActions): postState => {
  switch (action.type) {
    case postActionTypes.POST_SUCCESS:
      const post = action.post;
      return {
        ...state,
        post: post,
      };
    case postActionTypes.POST_FAILURE:
      return {
        ...state,
        post: null,
      };
    case postActionTypes.POSTS_SUCCESS:
      const posts = action.posts;
      return {
        ...state,
        posts: posts,
      };
    case postActionTypes.POSTS_FAILURE:
      return {
        ...state,
        posts: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default post;
