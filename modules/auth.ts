import {
  authActions,
  authActionTypes,
  Register,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  CheckLogin,
} from "../interfaces/module/auth/authact.interface";
import { authState } from "../interfaces/module/auth/auth.interface";
import { User } from "../interfaces/module/auth/auth.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../pages/api/users";

interface checkIner {
  token: string;
}

interface uidInter {
  uid: string;
}

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

export const checkLogin = ({ token }: checkIner): CheckLogin => ({
  type: authActionTypes.CHECK_LOGIN,
  payload: token,
});

const initialState: authState = {
  user: null,
  isLogined: false,
};

// register saga
function* registerSaga(action: any) {
  const { payload } = action;
  if (!payload) return;

  const registerRes = yield call(authAPI.register, payload);
  if (registerRes.status === 200) {
    console.log("회원가입 성공");
  } else {
    console.log("회원가입 실패");
  }
}

function* loginSaga(action: any) {
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

function* checkLoginSaga(action: any) {
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

export function* authSaga() {
  yield takeLatest(authActionTypes.REGISTER, registerSaga);
  yield takeLatest(authActionTypes.LOGIN, loginSaga);
  yield takeLatest(authActionTypes.CHECK_LOGIN, checkLoginSaga);
}

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
    case authActionTypes.LOGOUT:
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
