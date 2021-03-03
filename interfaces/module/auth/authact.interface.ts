import { User } from "./auth.interface";

export enum authActionTypes {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",
  CHECK_LOGIN = "CHECK_LOGIN",
}

export interface Register {
  type: authActionTypes.REGISTER;
  payload: User;
}

export interface Login {
  type: authActionTypes.LOGIN;
  payload: {
    id: string;
  };
}

export interface LoginSuccess {
  type: authActionTypes.LOGIN_SUCCESS;
  payload: {
    id: string;
  };
}

export interface LoginFailure {
  type: authActionTypes.LOGIN_FAILURE;
}

export interface Logout {
  type: authActionTypes.LOGOUT;
}

export interface LogoutSuccess {
  type: authActionTypes.LOGOUT_SUCCESS;
}

export interface LogoutFailure {
  type: authActionTypes.LOGOUT_FAILURE;
}

export interface CheckLogin {
  type: authActionTypes.CHECK_LOGIN;
  payload: { token: string };
}

export type authActions =
  | Register
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | CheckLogin;
