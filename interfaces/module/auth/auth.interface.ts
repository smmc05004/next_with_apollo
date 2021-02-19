// auth
export interface UserId {
  id: string;
}

export interface User extends UserId {
  name: string;
}

export interface authState {
  user: User | null;
  isLogined: boolean;
}

// oauth
export interface Token {
  token: string;
}

// auth component
type AuthAction = "login" | "register";

export interface AuthType {
  authType: AuthAction;
}