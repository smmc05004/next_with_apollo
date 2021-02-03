import {
  authActions,
  authActionTypes,
  Register,
} from "../interfaces/module/auth/authact.interface";
import { authState } from "../interfaces/module/auth/auth.interface";
import { User } from "../interfaces/module/auth/auth.interface";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../pages/api/users";

export const register = (user: User): Register => ({
  type: authActionTypes.REGISTER,
  payload: user,
});

const initialState: authState = {
  user: null,
};

// register saga
function* registerSaga(action: any) {
  const { payload } = action;
  if (!payload) return;

  const registerRes = authAPI.register(payload);
  console.log("registerRes: ", registerRes);
}

export function* authSaga() {
  yield takeLatest(authActionTypes.REGISTER, registerSaga);
}

const auth = (state = initialState, action: authActions): authState => {
  console.log("auth action: ", action);

  switch (action.type) {
    case authActionTypes.REGISTER:
      return {
        user: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default auth;
