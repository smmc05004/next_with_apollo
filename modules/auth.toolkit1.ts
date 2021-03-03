import {
  authActions,
  authActionTypes,
  Register,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  CheckLogin,
  LogoutSuccess,
  LogoutFailure,
} from "../interfaces/module/auth/authact.interface";
import { authState } from "../interfaces/module/auth/auth.interface";
import { Token, UserId, User } from "../interfaces/module/auth/auth.interface";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as authAPI from "../pages/api/users";
import { createAction, createReducer } from "@reduxjs/toolkit";

// action creator
export const register = createAction<User>(authActionTypes.REGISTER);

// login
export const login = createAction<UserId>(authActionTypes.LOGIN);
export const loginSuccess = createAction<UserId>(authActionTypes.LOGIN_SUCCESS);
export const loginFailure = createAction<undefined>(
  authActionTypes.LOGIN_FAILURE
);

// logout
export const logout = createAction<undefined>(authActionTypes.LOGOUT);
export const logoutSuccess = createAction<undefined>(
  authActionTypes.LOGOUT_SUCCESS
);
export const logoutFailure = createAction<undefined>(
  authActionTypes.LOGOUT_FAILURE
);

// login check
export const checkLogin = createAction<Token>(authActionTypes.CHECK_LOGIN);

// init state
const initialState: authState = {
  user: null,
  isLogined: false,
};

// auth sagas
function* registerSaga(action: Register) {
  const { payload } = action;
  if (!payload) return;

  const registerRes = yield call(authAPI.register, payload);
  if (registerRes.status === 200) {
    console.log("회원가입 성공");
  } else {
    console.log("회원가입 실패");
  }
}

function* loginSaga(action: Login) {
  const { payload } = action;
  if (!payload) return;

  const uid = payload;
  const loginRes = yield call(authAPI.login, uid);

  if (loginRes.status === 200) {
    yield put(loginSuccess({ id: uid }));
  } else {
    yield put(loginFailure());
  }
}

function* checkLoginSaga(action: CheckLogin) {
  const { payload } = action;

  if (!payload) return;
  const { token } = payload;

  const checkRes = yield call(authAPI.check, token);

  if (checkRes.status === 200) {
    const uid = checkRes.data.data;
    yield put(loginSuccess({ id: uid }));
  } else {
    yield put(loginFailure());
  }
}

function* logoutSaga(action: Logout) {
  const state = yield select();

  const uid = state.auth.user.id;
  const logoutRes = yield call(authAPI.logout, uid);

  if (logoutRes.status === 200) {
    yield put(logoutSuccess());
  } else {
    yield put(logoutFailure());
  }
}

export function* authSaga() {
  yield takeLatest(authActionTypes.REGISTER, registerSaga);
  yield takeLatest(authActionTypes.LOGIN, loginSaga);
  yield takeLatest(authActionTypes.CHECK_LOGIN, checkLoginSaga);
  yield takeLatest(authActionTypes.LOGOUT, logoutSaga);
}

// auth reducer
const auth = createReducer(initialState, {
  [authActionTypes.REGISTER]: (state: authState, action: Register) => ({
    ...state,
    user: action.payload,
  }),
  [authActionTypes.LOGIN_SUCCESS]: (state: authState, action: LoginSuccess) => {
    const uid = action.payload.id;

    return {
      ...state,
      user: { id: uid, name: "" },
      isLogined: true,
    };
  },
  [authActionTypes.LOGIN_FAILURE]: (
    state: authState,
    action: LoginFailure
  ) => ({
    ...state,
    user: null,
    isLogined: false,
  }),
  [authActionTypes.LOGOUT_SUCCESS]: (
    state: authState,
    action: LogoutSuccess
  ) => ({
    ...state,
    user: null,
    isLogined: false,
  }),
  [authActionTypes.LOGOUT_FAILURE]: (
    state: authState,
    action: LogoutFailure
  ) => ({
    ...state,
    user: null,
    isLogined: false,
  }),
});

export default auth;
