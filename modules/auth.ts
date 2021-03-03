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
import {
  Action,
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface LoginProps {
  id: string;
}
interface CheckLoginProps {
  token: string;
}

const prefix = "AUTH";

// login check
// export const checkLogin = createAction<Token>(authActionTypes.CHECK_LOGIN);

// init state
const initialState: authState = {
  user: null,
  isLogined: false,
};

// auth sagas
function* registerSaga(action: PayloadAction<User>) {
  const { payload } = action;

  if (!payload) return;

  const registerRes = yield call(authAPI.register, payload);
  if (registerRes.status === 200) {
    console.log("회원가입 성공");
  } else {
    console.log("회원가입 실패");
  }
}

function* loginSaga(action: PayloadAction<LoginProps>) {
  const { payload } = action;

  if (!payload) return;

  const { id } = payload;
  const loginRes = yield call(authAPI.login, id);

  if (loginRes.status === 200) {
    yield put(authSlice.actions.LOGIN_SUCCESS({ id }));
  } else {
    yield put(authSlice.actions.LOGIN_FAILURE());
  }
}

function* checkLoginSaga(action: PayloadAction<CheckLoginProps>) {
  const { payload } = action;

  if (!payload) return;
  const { token } = payload;

  const checkRes = yield call(authAPI.check, token);

  if (checkRes.status === 200) {
    const id = checkRes.data.data;
    yield put(authSlice.actions.LOGIN_SUCCESS({ id }));
  } else {
    yield put(authSlice.actions.LOGIN_FAILURE());
  }
}

function* logoutSaga(action: Action) {
  const state = yield select();

  const uid = state.auth.user.id;
  const logoutRes = yield call(authAPI.logout, uid);

  if (logoutRes.status === 200) {
    yield put(authSlice.actions.LOGOUT_SUCCESS());
  } else {
    yield put(authSlice.actions.LOGOUT_FAILURE());
  }
}

export function* authSaga() {
  const { REGISTER, LOGIN, CHECK_LOGIN, LOGOUT } = authSlice.actions;

  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK_LOGIN, checkLoginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

// auth reducer
const auth = {
  REGISTER: (
    state: authState,
    { payload: { id, name } }: PayloadAction<User>
  ) => {
    return {
      ...state,
      user: {
        id,
        name,
      },
    };
  },
  LOGIN: (state: authState, { payload: { id } }: PayloadAction<LoginProps>) => {
    return {
      user: null,
      isLogined: false,
    };
  },
  LOGIN_SUCCESS: (
    state: authState,
    { payload: { id } }: PayloadAction<LoginProps>
  ) => ({
    ...state,
    user: { id, name: "" },
    isLogined: true,
  }),
  LOGIN_FAILURE: (state: authState, action: Action) => ({
    user: null,
    isLogined: false,
  }),
  CHECK_LOGIN: (
    state: authState,
    { payload: { token } }: PayloadAction<CheckLoginProps>
  ) => ({
    user: null,
    isLogined: false,
  }),
  LOGOUT: (state: authState, action: Action) => {},
  LOGOUT_SUCCESS: (state: authState, action: Action) => ({
    user: null,
    isLogined: false,
  }),
  LOGOUT_FAILURE: (state: authState, action: Action) => ({
    user: null,
    isLogined: false,
  }),
};

const authSlice = createSlice({
  reducers: auth,
  initialState: initialState,
  name: prefix,
});

export default authSlice;
// export default auth;
