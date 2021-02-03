import { User } from "./auth.interface";

export enum authActionTypes {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface Register {
  type: authActionTypes.REGISTER;
  data: User;
}

export interface Login {
  type: authActionTypes.LOGIN;
  data: User;
}

export interface Logout {
  type: authActionTypes.LOGOUT;
  id: string;
}

export type authActions = Register | Login | Logout;
