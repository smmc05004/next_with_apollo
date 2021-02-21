import { loadingState, authState, postState, StockState } from "./index";

export interface RootStateInterface {
  loading: loadingState;
  auth: authState;
  post: postState;
  stock: StockState;
}
