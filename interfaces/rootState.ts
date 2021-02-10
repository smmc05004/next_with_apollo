import { loadingState, authState, postState } from "./index";

export interface RootStateInterface {
  loading: loadingState;
  auth: authState;
  post: postState;
}
