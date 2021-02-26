import { HYDRATE } from "next-redux-wrapper";
// import { combineReducers, AnyAction } from "redux";
import { AnyAction } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import post, { postSaga } from "./post";
// import stock, { stockSaga } from "./stock";
import stockSlice, { stockSaga } from "./stock";

import { RootStateInterface } from "../interfaces/rootState";

const rootReducer = (
  state: RootStateInterface = {
    loading: { loading: false },
    auth: { user: null, isLogined: false },
    post: { post: null, posts: [] },
    stock: { stock: null, stocks: { list: [], totalCnt: 0 } },
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
      // stock,
      stock: stockSlice.reducer,
    });
    return combineReducer(state, action);
  }
};

export function* rootSaga() {
  yield all([authSaga(), postSaga(), stockSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
