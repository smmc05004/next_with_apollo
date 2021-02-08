import { User } from "./auth.interface";

export enum authActionTypes {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

export interface Register {
  type: authActionTypes.REGISTER;
  payload: User;
}

export interface Login {
  type: authActionTypes.LOGIN;
  payload: string;
}

export interface LoginSuccess {
  type: authActionTypes.LOGIN_SUCCESS;
  uid: string;
}

export interface LoginFailure {
  type: authActionTypes.LOGIN_FAILURE;
}

export interface Logout {
  type: authActionTypes.LOGOUT;
  id: string;
}

export type authActions =
  | Register
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout;
