import { authActionTypes, authActions } from "../interfaces/module/auth/authact.interface";
import { authState, User } from "../interfaces/module/auth/auth.interface";

export const register = ({ User }) => ({
  type: authActionTypes.REGISTER,
  data: User,
});
