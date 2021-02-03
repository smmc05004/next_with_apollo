import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import { RootStateInterface } from "../interfaces/rootState";

const rootReducer = (
  state: RootStateInterface = { loading: { loading: false } },
  action: AnyAction
): RootStateInterface => {
  const type = action.type;
  if (type === HYDRATE) {
    return action.payload;
  } else {
    const combineReducer = combineReducers({
      loading,
    });
    return combineReducer(state, action);
  }
};

export function* rootSaga() {
  yield all([]);
}

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
