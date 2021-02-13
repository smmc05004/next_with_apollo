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
import { User } from "../interfaces/module/auth/auth.interface";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as authAPI from "../pages/api/users";

interface checkIner {
  token: string;
}

interface uidInter {
  uid: string;
}

// action creator
export const register = (user: User): Register => ({
  type: authActionTypes.REGISTER,
  payload: user,
});

export const login = (id: string): Login => ({
  type: authActionTypes.LOGIN,
  payload: id,
});

const loginSuccess = ({ uid }: uidInter): LoginSuccess => ({
  type: authActionTypes.LOGIN_SUCCESS,
  uid: uid,
});

const loginFailure = (): LoginFailure => ({
  type: authActionTypes.LOGIN_FAILURE,
});

export const logout = (): Logout => ({
  type: authActionTypes.LOGOUT,
});

export const logoutSuccess = (): LogoutSuccess => ({
  type: authActionTypes.LOGOUT_SUCCESS,
});

export const logoutFailure = (): LogoutFailure => ({
  type: authActionTypes.LOGOUT_FAILURE,
});

export const checkLogin = ({ token }: checkIner): CheckLogin => ({
  type: authActionTypes.CHECK_LOGIN,
  payload: token,
});

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
    yield put(loginSuccess({ uid }));
  } else {
    yield put(loginFailure());
  }
}

function* checkLoginSaga(action: CheckLogin) {
  const { payload } = action;

  if (!payload) return;
  const token = payload;
  const checkRes = yield call(authAPI.check, token);

  if (checkRes.status === 200) {
    const uid = checkRes.data.data;
    yield put(loginSuccess({ uid }));
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
const auth = (state = initialState, action: authActions): authState => {
  switch (action.type) {
    case authActionTypes.REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case authActionTypes.LOGIN_SUCCESS:
      const uid = action.uid;
      return {
        ...state,
        user: { id: uid, name: "" },
        isLogined: true,
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isLogined: false,
      };
    case authActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLogined: false,
      };
    case authActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
        isLogined: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default auth;
