import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import post, { postSaga } from "./post";

import { RootStateInterface } from "../interfaces/rootState";

const rootReducer = (
  state: RootStateInterface = {
    loading: { loading: false },
    auth: { user: null, isLogined: false },
    post: { posts: [], post: null },
  },
  action: AnyAction
): RootStateInterface => {
  const type = action.type;
  if (type === HYDRATE) {
    return action.payload;
  } else {
    const combineReducer = combineReducers({
      loading,
      auth,
      post,
    });
    return combineReducer(state, action);
  }
};

export function* rootSaga() {
  yield all([authSaga(), postSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
